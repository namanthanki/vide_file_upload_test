import { useState } from "react";
import axios from "axios";

const App = () => {
    const [selectedVidoes, setSelectedVideos] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleVideoChange = (e) => {
        const files = e.target.files;
        const filesArr = Array.from(files);
        setSelectedVideos(filesArr);
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const filesArr = Array.from(files);
        setSelectedImages(filesArr);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        const imagePromises = selectedImages.map((image) =>
            formData.append("images", image)
        );
        const videoPromises = selectedVidoes.map((video) =>
            formData.append("videos", video)
        );

        await Promise.all([...imagePromises, ...videoPromises]);

        try {
            const res = await axios.post(
                "http://localhost:3000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="images">Images</label>
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageChange}
                ></input>
                <label htmlFor="videos">Videos</label>
                <input
                    type="file"
                    name="videos"
                    multiple
                    onChange={handleVideoChange}
                ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
