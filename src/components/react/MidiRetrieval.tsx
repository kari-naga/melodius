import { useEffect, useState } from "react";
import "../../styles/MidiPlayer.css";

// @ts-ignore
const MidiPlayers = ({ midi_name }) => {
    const [filenames, setFilenames] = useState<any[]>([]);
    useEffect(() => {
        console.log("calling?")
        fetch(`/api/load-midi?filename=${midi_name}`, {
            method: 'GET',
        })
            .then(response => {
                // Check if the response status is OK (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON body of the response
                return response.json();
            })
            .then(data => {
                // Handle the data r.bodyeceived from the server
                console.log(data.body);
                setFilenames(data.body.filenames)
            })
            .catch(error => {
                alert("error");
                console.error('Error:', error);
                // Handle errors
            });
    }, [])

    return (
        <div>
            {
                filenames?.map((filename) => {
                    console.log(filename)
                    return (
                        <div>
                            <section id="section3">
                                <h2>{`${filename} player`}</h2>
                                <midi-player
                                    src={`../../files/processed_midi/short-sample/${filename}`}
                                    sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
                                    visualizer="#section3 midi-visualizer"
                                >
                                </midi-player>
                                <midi-visualizer
                                    type="piano-roll"
                                    src={`../../files/processed_midi/short-sample/${filename}`}
                                >
                                </midi-visualizer>
                            </section>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default MidiPlayers;