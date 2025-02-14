import React, { useState, useEffect } from 'react';

const NasaImageOfDay = () => {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNasaImage = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
                );
                if (!response) {
                    throw new Error('Failed to fetch NASA image');
                }
                const data = await response.json();
                setImageData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchNasaImage();
    }, []);

    if (loading) {
        return (
            <div className="nasa-container text-center p-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="nasa-container text-center p-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="nasa-container card shadow-sm mb-4">
            <div className="card-body">
                <h3 className="card-title mb-3">NASA Astronomy Picture of the Day</h3>
                {imageData?.media_type === 'image' ? (
                    <img
                        src={imageData.url}
                        alt={imageData.title}
                        className="img-fluid rounded mb-3"
                        style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div className="ratio ratio-16x9 mb-3">
                        <iframe
                            src={imageData?.url}
                            title="NASA Video"
                            allowFullScreen
                            className="rounded"
                        />
                    </div>
                )}
                <h4 className="card-subtitle mb-2">{imageData?.title}</h4>
                <p className="card-text">{imageData?.explanation}</p>
                <p className="card-text">
                    <small className="text-muted">Date: {imageData?.date}</small>
                </p>
            </div>
        </div>
    );
};

export default NasaImageOfDay; 