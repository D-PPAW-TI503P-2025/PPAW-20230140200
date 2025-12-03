import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function PresensiPage() {
  const [coords, setCoords] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const token = localStorage.getItem("token");

  // Ambil lokasi pengguna
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => setError("Gagal mendapatkan lokasi: " + err.message)
      );
    } else {
      setError("Browser tidak mendukung geolocation.");
    }
  };

  // Start kamera (foto hanya untuk tampilan)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Tidak bisa mengakses kamera: " + err.message);
    }
  };

  // Ambil snapshot hanya untuk preview
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const url = canvas.toDataURL("image/jpeg");
    setPhotoURL(url);
    setMessage(""); // reset pesan sukses sebelumnya
    setError("");   // reset error sebelumnya
  };

  useEffect(() => {
    getLocation();
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Fungsi check-in / check-out, tanpa foto dikirim
  const handlePresensi = async (type) => {
    if (!coords && type === "check-in") return setError("Lokasi belum didapatkan.");

    try {
      const data = {};
      if (type === "check-in") {
        data.latitude = coords.lat;
        data.longitude = coords.lng;
      }

      const url =
        type === "check-in"
          ? "http://localhost:3001/api/presensi/check-in"
          : "http://localhost:3001/api/presensi/check-out";

      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
      setError("");
      setPhotoURL(null); // reset preview setelah presensi
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `${type === "check-in" ? "Check-in" : "Check-out"} gagal`
      );
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Presensi Mahasiswa</h2>

      {coords && (
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={16}
          style={{ height: "300px", width: "100%", marginBottom: "20px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coords.lat, coords.lng]}>
            <Popup>Lokasi Anda</Popup>
          </Marker>
        </MapContainer>
      )}

      <div className="mb-4">
        <video
          ref={videoRef}
          autoPlay
          className="w-full border rounded-md mb-2"
          style={{ maxHeight: "300px" }}
        />
        <button
          onClick={takePhoto}
          className="py-2 px-4 bg-yellow-500 text-white rounded-md mb-2"
        >
          Ambil Foto
        </button>

        {photoURL && (
          <div className="mt-2">
            <img
              src={photoURL}
              alt="Preview"
              className="w-full rounded-md border"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handlePresensi("check-in")}
          className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md"
        >
          Check-In
        </button>
        <button
          onClick={() => handlePresensi("check-out")}
          className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md"
        >
          Check-Out
        </button>
      </div>

      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default PresensiPage;