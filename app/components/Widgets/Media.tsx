"use client";
import { useState, useEffect, useRef } from "react";
import IonIcon from '@reacticons/ionicons';
import Matter from "matter-js";

const Media = () => {
    const sceneRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [mediaList, setMediaList] = useState([]);
    const desiredWidth = 70;
    const desiredHeight = 110;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/ott');
            const data = await response.json();
            setMediaList(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (mediaList.length === 0 || !mediaList) return;
        renderScene(mediaList);
    }, [mediaList]);

    interface ImageDimensions {
        width: number;
        height: number;
    }

    function loadImageDimensions(url: string): Promise<ImageDimensions> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = reject;
            img.src = url;
        });
    }

    function renderScene(data) {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Event = Matter.Events,
            Bodies = Matter.Bodies,
            Body = Matter.Body;  // Add Body for rotation

        var engine = Engine.create({
            gravity: {
                scale: 0.003
            },
            positionIterations: 8,
            velocityIterations: 8
        }),
            world = engine.world;

        const containerWidth = sceneRef.current.offsetWidth;
        const containerHeight = sceneRef.current.offsetHeight;

        var render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: containerWidth,
                height: containerHeight,
                showAngleIndicator: false,
                wireframes: false,
                background: 'transparent',
            }
        });

        Render.run(render);

        var runner = Runner.create();
        Runner.run(runner, engine);

        const wallThickness = 100;
        Composite.add(world, [
            Bodies.rectangle(containerWidth / 2, -wallThickness / 2, containerWidth + 200, wallThickness,
                { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(containerWidth / 2, containerHeight + wallThickness / 2, containerWidth + 200, wallThickness,
                { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(containerWidth + wallThickness / 2, containerHeight / 2, wallThickness, containerHeight + 200,
                { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(-wallThickness / 2, containerHeight / 2, wallThickness, containerHeight + 200,
                { isStatic: true, render: { visible: false } })
        ]);

        Promise.all(mediaList.map(media => loadImageDimensions(media.posterImage.pathUrl)))
            .then(dimensions => {
                const mediaBodies = mediaList.map((media, index) => {
                    const { width, height } = dimensions[index];
                    const xScale = desiredWidth / width;
                    const yScale = desiredHeight / height;

                    // Random position across the container with padding
                    const padding = 50;
                    const x = padding + Math.random() * (containerWidth - 2 * padding);
                    const y = padding + Math.random() * (containerHeight - 2 * padding);

                    // Create the body with rounded corners
                    const chamferRadius = Math.min(desiredWidth, desiredHeight) * 0.1;
                    const body = Bodies.rectangle(x, y, desiredWidth, desiredHeight, {
                        chamfer: { radius: chamferRadius },
                        title: media.titleKr,
                        restitution: 0.7,
                        frictionAir: 0.02,
                        render: {
                            sprite: {
                                texture: media.posterImage.pathUrl,
                                xScale: xScale,
                                yScale: yScale
                            }
                        }
                    });

                    // Apply random initial velocity
                    Body.setVelocity(body, {
                        x: (Math.random() - 0.5) * 5, // Random velocity between -2.5 and 2.5
                        y: (Math.random() - 0.5) * 5
                    });

                    // Apply random initial rotation
                    Body.setAngle(body, Math.random() * Math.PI * 2); // Random angle between 0 and 2π
                    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05); // Random rotation speed

                    return body;
                });

                Composite.add(world, mediaBodies);
            })
            .catch(error => {
                console.error('Error loading image dimensions:', error);
            });

        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(world, mouseConstraint);

        render.mouse = mouse;

        const handleResize = () => {
            const newWidth = sceneRef.current?.offsetWidth;
            const newHeight = sceneRef.current?.offsetHeight;

            render.options.width = newWidth;
            render.options.height = newHeight;
            render.canvas.width = newWidth;
            render.canvas.height = newHeight;

            Composite.clear(world, false, true);

            Composite.add(world, [
                Bodies.rectangle(newWidth / 2, -wallThickness / 2, newWidth + 200, wallThickness,
                    { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(newWidth / 2, newHeight + wallThickness / 2, newWidth + 200, wallThickness,
                    { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(newWidth + wallThickness / 2, newHeight / 2, wallThickness, newHeight + 200,
                    { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(-wallThickness / 2, newHeight / 2, wallThickness, newHeight + 200,
                    { isStatic: true, render: { visible: false } })
            ]);

            Composite.add(world, mouseConstraint);

            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: newWidth, y: newHeight }
            });
        };

        window.addEventListener('resize', handleResize);

        Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
            var allBodies = Matter.Composite.allBodies(engine.world);
            var foundBodies = Matter.Query.point(allBodies, event.mouse.position);
            try { setCurrentTitle(foundBodies[0].title); }
            catch (e) { setCurrentTitle(''); }
        });

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: containerWidth, y: containerHeight }
        });

        return function cleanup() {
            Render.stop(render);
            Runner.stop(runner);
            window.removeEventListener('resize', handleResize);
        };
    }

    const initCanvas = () => {
        const scene = sceneRef.current;
        while (scene.firstChild) {
            scene.removeChild(scene.lastChild);
        }
        renderScene(mediaList);
    }

    return (
        <div className="relative w-full h-full">
            <div className="mb-3">
                <h3 className="text-lg font-bold mb-1">{currentTitle || "최근에 감상한 콘텐츠"}</h3>
                <button className="relative float-right -top-9 bg-black/15 dark:bg-black/50 flex items-center justify-center rounded-full p-3 hover:bg-black/30 dark:hover:bg-black/30"
                    onClick={() => initCanvas()}>
                    <IonIcon name="reload" className="text-[var(--foreground)] text-sm" />
                </button>
            </div>

            <div className="absolute -bottom-5 -left-5" style={{ width: 'calc(100% + 40px)', height: 'calc(100% - 40px)' }} ref={sceneRef}>
            </div>
        </div>
    );
};

export default Media;