"use client";
import { useState, useEffect, useRef } from "react";
import IonIcon from '@reacticons/ionicons';
import Matter from "matter-js";

const SkillSet = () => {

    return (
        <div className="relative w-full h-full">
            <div className="mb-3">
                <h3 className="text-lg font-bold mb-4">My Stack</h3>
            </div>

            <div className="image-grid" style={{ display: 'grid' }}>
                <div className='tooltip'>
                    <svg viewBox="0 0 128 128" data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
                        <path fill="#d2d5da" d="M1.408 1.408h125.184v125.185H1.408z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">Javascript</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M47.617 98.12c-19.192 5.362 11.677 16.439 36.115 5.969-4.003-1.556-6.874-3.351-6.874-3.351-10.897 2.06-15.952 2.222-25.844 1.092-8.164-.935-3.397-3.71-3.397-3.71zm33.189-10.46c-14.444 2.779-22.787 2.69-33.354 1.6-8.171-.845-2.822-4.805-2.822-4.805-21.137 7.016 11.767 14.977 41.309 6.336-3.14-1.106-5.133-3.131-5.133-3.131zm11.319-60.575c.001 0-42.731 10.669-22.323 34.187 6.024 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.634-29.58zm9.998 81.144s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.095.171-4.45-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.952-3.487-32.013 6.85-13.742 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM85 77.896c2.395-1.634 5.703-3.053 5.703-3.053s-9.424 1.685-18.813 2.474c-11.494.964-23.823 1.154-30.012.326-14.652-1.959 8.033-7.348 8.033-7.348s-8.812-.596-19.644 4.644C17.455 81.134 61.958 83.958 85 77.896zm5.609 15.145c-.108.29-.468.616-.468.616 31.273-8.221 19.775-28.979 4.822-23.725-1.312.464-2 1.543-2 1.543s.829-.334 2.678-.72c7.559-1.575 18.389 10.119-5.032 22.286zM64.181 70.069c-4.614-10.429-20.26-19.553.007-35.559C89.459 14.563 76.492 1.587 76.492 1.587c5.23 20.608-18.451 26.833-26.999 39.667-5.821 8.745 2.857 18.142 14.688 28.815zm27.274 51.748c-19.187 3.612-42.854 3.191-56.887.874 0 0 2.874 2.38 17.646 3.331 22.476 1.437 57-.8 57.816-11.436.001 0-1.57 4.032-18.575 7.231z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">JAVA</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <g fill="#d2d5da"><path d="M0 0h61.4L0 60.4zM0 128L128 0H64.6L0 63.7zM128 128L64.6 66.6 3.3 128z"></path></g>
                    </svg>
                    <span className="tooltiptext tooltip-top">Kotlin</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6zM64 88.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">C</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">Next.js ㅡ FE</span>
                </div>


                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <g fill="#c9c9c9"><circle cx="64" cy="64" r="11.4"></circle><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path></g>
                    </svg>
                    <span className="tooltiptext tooltip-top">React ㅡ FE</span>
                </div>


                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M9.625 32.181C-1.404 48.032-.031 68.657 8.394 85.501c.2.404.41.801.617 1.198l.394.759.246.437.439.786c.262.461.53.92.804 1.379l.459.756c.304.491.615.976.933 1.46l.398.614c.439.655.888 1.309 1.352 1.951l.039.05.228.308c.401.553.814 1.099 1.232 1.639l.464.59c.373.469.752.935 1.138 1.399l.435.52a75.27 75.27 0 001.586 1.812l.033.033.061.068a80.44 80.44 0 001.612 1.699l.517.521c.423.426.853.845 1.287 1.262l.527.5c.58.547 1.166 1.083 1.764 1.607l.028.022.307.262c.527.456 1.063.909 1.603 1.353l.664.529c.441.354.887.702 1.336 1.044l.714.543c.496.365.995.724 1.499 1.075l.546.387.15.107c.478.329.967.646 1.456.963l.63.42c.75.474 1.51.943 2.279 1.396l.63.355c.565.326 1.134.646 1.71.959.312.168.632.327.946.488.407.213.811.429 1.225.636l.283.137.501.242c.641.306 1.287.607 1.94.897l.41.184a66.92 66.92 0 002.263.941l.551.217c.704.271 1.418.539 2.135.791l.268.093c.787.275 1.581.53 2.381.779l.575.172c.814.245 1.619.538 2.458.693 53.339 9.727 68.833-32.053 68.833-32.053-13.013 16.953-36.111 21.425-57.996 16.446-.829-.187-1.633-.446-2.442-.685l-.609-.185a72.498 72.498 0 01-2.352-.765l-.323-.117a72.245 72.245 0 01-2.074-.769l-.582-.229c-.752-.297-1.5-.607-2.239-.931l-.447-.198a92.857 92.857 0 01-1.889-.879l-.546-.262c-.491-.239-.977-.493-1.461-.743-.324-.171-.654-.332-.975-.51a58.591 58.591 0 01-1.751-.982l-.591-.33a81.221 81.221 0 01-2.28-1.397l-.615-.41a59.283 59.283 0 01-1.623-1.079l-.522-.367a89.287 89.287 0 01-1.534-1.109l-.679-.514a64.473 64.473 0 01-1.384-1.082l-.617-.495a82.693 82.693 0 01-1.724-1.453l-.189-.159a83.466 83.466 0 01-1.812-1.647l-.511-.491c-.441-.42-.875-.843-1.302-1.277l-.51-.509a70.541 70.541 0 01-1.598-1.69l-.079-.084a67.39 67.39 0 01-1.621-1.844l-.424-.504a70.602 70.602 0 01-1.167-1.442l-.427-.532a78.406 78.406 0 01-1.347-1.794c-12.15-16.574-16.516-39.432-6.805-58.204m25.629-2.434c-7.977 11.478-7.543 26.844-1.321 38.983a50.581 50.581 0 003.528 5.889c1.195 1.713 2.52 3.751 4.106 5.127a48.111 48.111 0 001.79 1.858l.472.465a51.69 51.69 0 001.828 1.698l.074.064.018.018a55.268 55.268 0 002.135 1.767l.485.378a54.08 54.08 0 002.233 1.631l.065.049c.336.232.678.448 1.019.672l.483.319c.544.349 1.095.689 1.655 1.015l.235.136c.483.278.972.552 1.463.818l.521.271c.339.177.678.358 1.023.53l.155.07c.703.346 1.412.68 2.136.995l.472.194c.579.246 1.164.486 1.75.71l.75.275c.533.198 1.068.378 1.607.559l.727.233c.767.238 1.525.539 2.324.672 41.183 6.823 50.691-24.886 50.691-24.886-8.57 12.343-25.168 18.233-42.879 13.635a50.376 50.376 0 01-2.333-.674l-.701-.227a45.423 45.423 0 01-1.631-.562l-.736-.274a56.418 56.418 0 01-1.756-.708l-.473-.2a47.728 47.728 0 01-2.148-.999c-.363-.177-.72-.364-1.078-.548l-.622-.32a44.502 44.502 0 01-1.363-.77l-.326-.185a47.844 47.844 0 01-1.651-1.008l-.498-.332a61.759 61.759 0 01-1.069-.707 57.456 57.456 0 01-2.226-1.628l-.501-.395c-7.752-6.12-13.898-14.486-16.819-23.971-3.062-9.836-2.402-20.878 2.903-29.84m22.278-.775c-4.702 6.92-5.164 15.514-1.901 23.156 3.441 8.113 10.491 14.476 18.72 17.495.339.125.679.237 1.022.354l.451.143c.485.152.966.329 1.467.424 22.74 4.394 28.908-11.669 30.549-14.034-5.402 7.779-14.482 9.646-25.623 6.942-.88-.213-1.847-.531-2.695-.832a33.242 33.242 0 01-3.201-1.329 33.215 33.215 0 01-5.612-3.424c-9.969-7.565-16.162-21.994-9.657-33.745"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">jQuery ㅡ FE</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">node.js ㅡ BE</span>
                </div>

                <div className='tooltip'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#d2d5da" d="M75.4.3c-.9 0-1.8.2-2.6.5 1.7 1.1 2.6 2.6 3.1 4.3 0 .2.1.4.1.6 0 .2.1.4.1.6.1 2.9-.8 3.3-1.4 5-1 2.2-.7 4.6.5 6.5.1.2.2.5.4.7-1.3-8.4 5.7-9.6 7-12.2.1-2.3-1.8-3.8-3.3-4.9C77.8.5 76.6.3 75.4.3zm10.5 1.8c-.1.8 0 .6-.1 1 0 .3 0 .6-.1.9-.1.3-.1.5-.2.8-.1.3-.2.5-.3.8-.1.2-.2.4-.3.7-.1.1-.2.3-.3.4-.1.1-.1.2-.2.3-.2.2-.3.5-.5.7l-.6.6c-.2.2-.4.4-.6.5-.7.5-1.5.9-2.2 1.4-.2.2-.5.3-.7.5-.2.2-.4.3-.6.5l-.6.6c-.2.2-.4.4-.5.7-.2.2-.3.5-.5.7-.1.3-.2.5-.4.8-.1.3-.2.5-.3.8-.1.3-.2.6-.2.8 0 .1 0 .3-.1.4 0 .1 0 .3-.1.4v1.4c0 .3 0 .5.1.8 0 .3.1.5.2.8.1.3.2.5.3.8.1.2.2.3.2.5l-7.6-2.9c-1.3-.4-2.5-.7-3.8-1-.7-.2-1.4-.3-2.1-.5-2-.4-4-.7-6-.9h-.2c-2-.2-3.9-.3-5.9-.3-1.5 0-2.9.1-4.3.2-2 .1-4 .4-6 .7l-1.5.3c-1 .2-2 .4-3 .7-.5.1-1 .3-1.5.4-.5.2-1 .4-1.4.6-.4.2-.7.3-1.1.5-.1 0-.1 0-.2.1-.3.2-.6.3-.9.5-.1 0-.2.1-.2.1-.4.2-.7.4-1 .5-.2.1-.5.2-.7.3-.1.1-.2.1-.3.2-.3.2-.6.3-.9.5-.3.2-.6.3-.8.5-.2.2-.5.3-.7.5 0 0-.1 0-.1.1-.2.1-.4.3-.6.5l-.1.1c-.2.1-.3.3-.5.4-.1 0-.1.1-.2.1-.2.1-.3.3-.5.4 0 .1-.1.1-.1.1l-.6.6-.1.1-.6.6s0 .1-.1.1l-.5.5c-.1.1-.2.1-.2.2l-.6.6c0 .1-.1.1-.1.2l-.8.8-.1.1c-.5.6-1.1 1.1-1.7 1.6-.6.5-1.2 1-1.9 1.5s-1.3.9-2 1.3-1.4.7-2.1 1c-.7.3-1.4.6-2.1.8-1.4.3-2.8.9-4 1 0-.5-.3-.4-.6-.4-.3.1-.6.1-.8.2-.3.1-.5.2-.8.3-.3.1-.5.2-.8.4-.2.2-.5.3-.7.5-.2.2-.5.4-.7.6-.2.2-.5.4-.7.6-.2.2-.4.4-.6.7-.2.3-.4.5-.5.8-.2.2-.3.5-.5.8-.1.3-.3.6-.4.9l-.3.9c-.1.3-.1.5-.2.8v.1c-.1.3-.1.7-.1.9.1-.1.1.1.1.3v.4c0 .2.1.4.1.6.1.2.1.4.2.6.1.2.2.4.4.6.1.2.3.4.4.6.2.2.4.4.6.5.2.2.4.4.6.5.8.7 1 .9 2 1.5.2.1.3.2.5.3h.1v.2c0 .3.1.5.2.8.1.3.2.6.3.8l.3.6c0 .1.1.1.1.2.1.3.3.5.4.7.2.2.3.5.5.7l.6.6.6.6H8c.2.2.4.3.6.5.2.2.5.3.7.4.2.1.5.3.8.4.2.1.4.2.7.2 0 0 .1 0 .1.1.1 0 .3.1.4.1-.1 1.8-.1 3.5.1 4.1.3.7 1.8-1.4 3.2-3.7-.2 2.3-.3 5 0 5.8.4.8 2.3-1.8 4.1-4.6 23.4-5.4 44.8 10.8 47.1 33.7-.4-3.6-4.8-5.6-6.9-5.1-1 2.4-2.7 5.6-5.4 7.5.2-2.2.1-4.4-.3-6.6-.7 3-2.1 5.9-4.1 8.3-3.1.2-6.3-1.3-7.9-3.6-.1-.1-.2-.3-.3-.4-.1-.2-.2-.5-.3-.7-.1-.2-.2-.5-.2-.7v-.7-.5c0-.2.1-.5.2-.7.1-.2.1-.5.2-.7.1-.2.2-.5.4-.7.6-1.6.6-2.9-.5-3.6l-.6-.3c-.1 0-.3-.1-.4-.1-.1 0-.2-.1-.3-.1-.2-.1-.5-.1-.7-.2-.2-.1-.5-.1-.7-.1-.2 0-.5-.1-.7-.1h-.5c-.3 0-.5 0-.7.1-.2 0-.5.1-.7.1-.2.1-.5.1-.7.2-.2.1-.4.2-.7.3l-.6.3c-7.7 5-3.1 16.8 2.1 20.2-2 .4-4 .8-4.6 1.2l-.1.1c1.4.9 2.9 1.6 4.5 2.2 2.1.7 4.4 1.3 5.4 1.6 2.7.6 5.5.8 8.3.6 14.6-1 26.6-12.2 28.8-26.8.1.3.1.6.2.9.1.6.2 1.2.3 1.9.1.3.1.6.1.9v.1c0 .3.1.6.1.9 0 .4.1.7.1 1.1V91.6c0 .3-.1.5-.1.8v.3c0 .3-.1.6-.1 1-.1.3-.1.6-.2.9v.1c-.1.3-.1.6-.2.9v.1c-.1.3-.1.6-.2.9v.1l-.3.9v.1c-.1.3-.2.7-.3 1-.1.3-.2.6-.4 1-.1.3-.2.7-.4 1-.1.3-.3.6-.4 1-.1.3-.3.6-.4.9 0 .1-.1.2-.1.2s0 .1-.1.1c-2.1 4.3-5.3 8.1-9.3 11.1-.3.2-.5.4-.8.6-.1.1-.2.1-.2.2-.2.2-.5.3-.7.5l.1.2c.5-.1.9-.1 1.4-.2.9-.1 1.7-.3 2.6-.5.2 0 .5-.1.7-.2.2 0 .3-.1.5-.1s.5-.1.7-.1c.2-.1.4-.1.6-.2 3.3-.8 6.5-1.9 9.6-3.2-5.3 7.2-12.3 13-20.5 16.8 3.8-.3 7.6-.9 11.3-2 13.3-3.9 24.5-12.9 31.2-25-1.4 7.6-4.4 14.9-8.9 21.3 3.2-2.1 6.1-4.6 8.8-7.3 7.4-7.7 12.3-17.6 13.9-28.1 1.1 5.2 1.5 10.6 1 15.9 23.9-33.3 2-67.8-7.2-76.9 0-.1-.1-.1-.1-.2v0c0 .4 0 .8-.1 1.2-.1.8-.2 1.5-.3 2.2-.2.7-.4 1.5-.6 2.2-.2.7-.5 1.4-.8 2.1-.3.7-.6 1.4-1 2-.4.6-.8 1.3-1.2 1.9-.4.6-.9 1.2-1.4 1.8-.5.6-1 1.1-1.6 1.7-.3.3-.6.6-1 .8-.3.2-.5.4-.8.7-.6.5-1.2.9-1.9 1.3-.6.4-1.3.8-2 1.1l-2.1.9c-.7.3-1.4.5-2.1.7-.7.2-1.5.4-2.2.5-.8.1-1.5.2-2.2.3-.5 0-1.1.1-1.6.1-.8 0-1.5-.1-2.2-.1-.8-.1-1.5-.2-2.2-.3-.8-.1-1.5-.3-2.2-.6.7-.1 1.5-.1 2.2-.3.8-.1 1.5-.3 2.2-.5.7-.2 1.5-.4 2.1-.7l2.1-.9c.7-.3 1.3-.7 2-1.1.6-.4 1.3-.9 1.9-1.3.6-.5 1.2-1 1.7-1.5.6-.5 1.1-1.1 1.6-1.6.5-.6 1-1.2 1.4-1.8.1-.1.1-.2.2-.3.3-.5.7-1.1 1-1.6.4-.7.7-1.3 1-2 .3-.7.6-1.4.8-2.1l.6-2.1c.1-.8.3-1.5.3-2.2.1-.8.1-1.5.1-2.2 0-.5 0-1.1-.1-1.6-.1-.8-.2-1.5-.3-2.2-.1-.8-.3-1.5-.5-2.2-.2-.7-.5-1.4-.7-2.1-.3-.7-.6-1.4-.9-2-.4-.7-.7-1.3-1.1-2-.4-.6-.9-1.2-1.3-1.8-.5-.6-1-1.1-1.5-1.7-.3-.3-.6-.6-.9-.8-1.5-1.2-3-2.2-4.6-3.2-.2-.1-.4-.2-.7-.3-1.3-1.1-2.3-1.4-3.3-1.8z" /></svg>
                    <span className="tooltiptext tooltip-top">nestJS ㅡ BE</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M27.35 80.52l10.68-68.44c.37-2.33 3.5-2.89 4.6-.8l11.48 21.48-26.76 47.76zm75.94 16.63L93.1 34.11c-.31-1.96-2.76-2.76-4.17-1.35L24.71 97.15l35.54 19.95a7.447 7.447 0 007.18 0l35.86-19.95zm-28.85-55L66.21 26.5c-.92-1.78-3.44-1.78-4.36 0L25.7 90.95l48.74-48.8z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">Firebase ㅡ BaaS</span>
                </div>

                <div className='tooltip'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                        <g id="Ð¡Ð»Ð¾Ð¹_1"><path fill="#d2d5da" d="M43.9,22.5L27.5,43.3c-1.2,1.4-3.5,0.6-3.5-1.2V30H6.6c-2.1,0-3.3-2.5-2-4.1L20.7,5.1c1.1-1.5,3.4-0.7,3.4,1.2 v12.1h17.7C44.1,18.4,45.3,20.8,43.9,22.5z"></path></g>
                    </svg>
                    <span className="tooltiptext tooltip-top">Supabase ㅡ BaaS</span>
                </div>

                <div className='tooltip'>
                    <svg viewBox="0 0 128 128">
                        <path fill="#d2d5da" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"></path>
                    </svg>
                    <span className="tooltiptext tooltip-top">Git ㅡ Tool</span>
                </div>
            </div>

            <style jsx>{`
            .image-grid {
                grid-template-columns: repeat(4, 1fr)
            }
            
.tooltip {
  position: relative;
  display: block;
  transform: scale(0.7) !important;
  transition: transform 0.3s ease;
}

.tooltip:hover {
  transform: scale(0.75) !important;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #6e67e8;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 16px;
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}


.tooltip .tooltip-top {
  top: -20px;
  right: -30px;
}

                @media (max-width: 768px) {
                    .image-grid {
                        grid-template-columns: repeat(5, 1fr)
                    }
                }
            `}</style>
        </div>
    );
};

export default SkillSet;