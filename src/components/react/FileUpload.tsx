import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import UploadFile from "../../assets/images/upload-file.svg";
import MusicFile from "../../assets/images/music-file.svg";
import CloseCircle from "../../assets/images/close-circle.svg";
import Loader from "./Loader";
import { navigate } from "astro/transitions/router";

const FileUpload = () => {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        console.log(file)
    }, [file])

    const submitFile = () => {
        if (!file) {
            setError(true);
            return;
        }

        setLoading(true);
        setFile(false);
        const formData = new FormData();
        formData.append('file', file);
        console.log(file.name)
        formData.append('sourceCount', '2')
        fetch('/api/split', {
            method: 'POST',
            body: formData
        })
            // .then(response => re)
            .then(data => {
                // console.log(data.json())
                setLoading(false);
                navigate(`/editor/${file.name}`)
                // alert("success")
            })
            .catch(error => {
                setLoading(false);
                alert("error");
                console.error('Error:', error);
                // Handle errors
            });
    }

    function handleChange(e: any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(false);
        }
    }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setError(false);
        }
    }

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        console.log("XD")
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile() {
        setFile(null);
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }
    return (
        <>
            {loading ? <Loader />
                :
                ''
            }
            < div
                className="w-full h-fit rounded-lg p-8 flex flex-col gap-8 "
                style={{ background: "linear-gradient(to bottom,rgba(56, 189, 248, 0.04) 0%,rgba(8, 145, 178,.08) 100%)" }
                }
            >
                <div className={`${dragActive ? 'animate-border bg-gradient-to-r' : 'bg-transparent'} h-[23rem] inline-block rounded-lg from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-[0.5px]`}>
                    <form
                        className={`${dragActive ? '' : 'border-[1px] border-dashed border border-cyan-900'} bg-[#04091E] w-full h-full rounded-lg p-1
          flex flex-col gap-6 items-center justify-center hover:cursor-pointer`}
                        onDragEnter={handleDragEnter}
                        onSubmit={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onClick={openFileExplorer}
                    >
                        <input
                            placeholder="fileInput"
                            className="hidden"
                            ref={inputRef}
                            type="file"
                            multiple={true}
                            onChange={handleChange}
                            accept=".mp3"
                        />
                        <img
                            src={UploadFile.src}
                            height="80"
                            width="80"
                            alt="Example SVG"
                        />

                        <p className="text-4xl max-w-[380px] text-center font-medium">
                            Drag & drop <span className="text-[#38bdf8]">.mp3</span>,
                            <span className="text-[#38bdf8]"> or .wav </span> files
                        </p>
                        <p
                            className="text-lg max-w-[300px] text-center line-height-8 font-normal tracking-wide"
                        >
                            or <span onClick={openFileExplorer} className="text-[#38bdf8] underline hover:cursor-pointer">
                                browse files</span> on
                            your computer
                        </p>
                    </form>
                </div>
                {
                    file ?
                        <div className="border border-[1px] border-slate-800 min-h-[5rem] rounded-lg flex px-4 py-3 flex-col gap-1">
                            <div className="flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="border-slate-700 border-[1px] h-10 w-10 flex justify-center rounded-lg">
                                        <img src={MusicFile.src} width="30" height="30" />
                                    </div>
                                    <h1 className="text-small mb-1 text-xs uppercase">{file.name}</h1>
                                </div>
                                <img onClick={removeFile} className="hover:cursor-pointer" src={CloseCircle.src} height="30" width="30" />
                            </div>
                            <div className="flex justify-left items-center gap-2">
                                <div className="w-full bg-blue-500 rounded-full h-2">
                                </div>
                                <h1 className="text-small mb-1 text-xs">100%</h1>
                            </div>
                        </div>
                        :
                        ''

                }
                {error ?
                    <h1 className="text-center text-red-400 font-sans font-semibold font-mono">no file selected</h1>
                    :
                    ''
                }
                <button
                    onClick={submitFile}
                    className="hover:animate-border bg-gradient-to-r bg-[length:400%_400%] from-cyan-500 to-blue-500 px-4 w-[15rem] font-semibold py-2 m-auto rounded-2xl"
                >
                    Generate
                </button>
            </div >
        </>
    )
};

export default FileUpload;