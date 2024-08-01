import axios from "axios";
import { useState, useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";

const Detail = ({ id, auth }) => {
    const user = auth ? auth.user : null;

    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASEURL;
    const imgURL = import.meta.env.VITE_IMGURL;
    const url = `${baseURL}/movie/${id}?api_key=${apiKey}`;
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => { setDetail(res.data) })
            .catch(err => console.log(err));
    });

    const voteAverage = typeof detail.vote_average === 'number' ? detail.vote_average.toFixed(1) : 'N/A';
    const originalLanguage = typeof detail.original_language === 'string' ? detail.original_language : 'N/A';

    return (
        <>
            <MainLayout title="Detail" user={user}>
                <div className="container-lg h-screen bg-custom-primary border border-b-2 border-white">
                    <div className="relative h-3/4">
                        <img src={`${imgURL}/w1280/${detail.backdrop_path}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-custom-primary via-transparent to-transparent">
                            <div className="flex text-white px-32 pt-72">
                                <div className="card w-52 rounded-none">
                                    <figure>
                                        <img
                                            src={`${imgURL}/w500/${detail.poster_path}`}
                                            alt="Poster"
                                        />
                                    </figure>
                                </div>
                                <div className="w-full ps-4">
                                    <div className="flex items-center">
                                        <span className="bg-red-600 rounded-sm font-bold px-4 py-1 text-lg me-1">{voteAverage}</span>
                                        <span className="bg-blue-600 rounded-sm font-bold px-4 py-1 text-lg">{originalLanguage}</span>
                                    </div>
                                    <h3 className="font-bold text-6xl">{detail.title}</h3>
                                    <p className="text-xl text-justify">{detail.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Detail;