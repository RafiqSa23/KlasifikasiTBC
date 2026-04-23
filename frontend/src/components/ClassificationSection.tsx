import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Image,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import ApiService, { PredictionResult, ModelInfo } from "@/services/api";

const ClassificationSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
    probabilities?: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { ref, isVisible } = useScrollReveal();

  // Cek koneksi API saat komponen dimuat
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const health = await ApiService.healthCheck();
        if (health.status === "healthy") {
          setApiConnected(true);
          const info = await ApiService.getModelInfo();
          setModelInfo(info);
          console.log("✅ Backend connected:", info);
        } else {
          setApiConnected(false);
          setError("Backend is not healthy");
        }
      } catch (err) {
        console.error("API connection failed:", err);
        setApiConnected(false);
        setError(
          "Cannot connect to backend server. Please make sure Flask server is running on port 5000."
        );
      }
    };
    checkApiConnection();
  }, []);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (
      f &&
      (f.type === "image/jpeg" ||
        f.type === "image/jpg" ||
        f.type === "image/png")
    ) {
      handleFile(f);
    } else {
      setError("Format file tidak didukung. Gunakan JPG, JPEG, atau PNG.");
    }
  };

  const handleClassify = async () => {
    if (!file) return;
    if (!apiConnected) {
      setError("Backend tidak terhubung. Pastikan server Flask berjalan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prediction = await ApiService.predict(file);
      setResult({
        label: prediction.predicted_class,
        confidence: prediction.confidence * 100,
        probabilities: prediction.probabilities,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section id="klasifikasi" className="py-24 gradient-section">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Klasifikasi <span className="text-gradient">X-Ray Dada</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Unggah citra X-ray dada dan dapatkan hasil klasifikasi secara instan
            menggunakan model MobileNetV2.
          </p>

          {/* Status Koneksi API */}
          {apiConnected !== null && (
            <div className="flex justify-center mt-4">
              {apiConnected ? (
                <div className="flex items-center gap-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <Wifi size={12} />
                  <span>
                    Server Connected • Model:{" "}
                    {modelInfo?.model || "MobileNetV2"}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  <WifiOff size={12} />
                  <span>Server Disconnected</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Upload area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className={`gradient-card rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all hover:shadow-elevated group
              ${
                apiConnected === false
                  ? "border-red-300 bg-red-50/50"
                  : "border-primary/30 hover:border-primary/60"
              }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
            {preview ? (
              <img
                src={preview}
                alt="X-ray preview"
                className="mx-auto max-h-72 rounded-xl object-contain"
              />
            ) : (
              <>
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all group-hover:scale-110
                  ${
                    apiConnected === false
                      ? "bg-red-100 text-red-500"
                      : "bg-secondary text-primary"
                  }`}
                >
                  <Upload size={28} />
                </div>
                <p className="font-semibold text-foreground mb-1">
                  Seret & lepas atau klik untuk unggah
                </p>
                <p className="text-sm text-muted-foreground">
                  Format: JPG, PNG • Citra X-ray dada (Max 16MB)
                </p>
              </>
            )}
          </div>

          {/* File info and classify button */}
          {file && (
            <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Image size={16} />
                <span className="truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetForm}
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100"
                >
                  Hapus
                </button>
                <button
                  onClick={handleClassify}
                  disabled={loading || !apiConnected}
                  className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Memproses..." : "Klasifikasi"}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
              {/* <div className="flex items-start gap-3">
                <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                  {!apiConnected && (
                    <p className="text-xs text-red-500 mt-2">
                      Pastikan backend Flask berjalan:{" "}
                      <code className="bg-red-100 px-1 rounded">
                        cd web_app && python app.py
                      </code>
                    </p>
                  )}
                </div>
              </div> */}
            </div>
          )}

          {/* Result */}
          {result && (
            <div
              className={`mt-6 rounded-2xl p-6 shadow-card animate-fade-up ${
                result.label === "Normal"
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {result.label === "Normal" ? (
                  <CheckCircle2 className="text-emerald-600" size={28} />
                ) : (
                  <XCircle className="text-red-600" size={28} />
                )}
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Hasil: {result.label}
                </h3>
              </div>

              {/* Confidence Score */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Confidence Score
                  </span>
                  <span className="font-semibold">
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.label === "Normal"
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>

              {/* Probabilities Detail (if available) */}
              {result.probabilities && (
                <div className="mb-4 pt-2 border-t border-gray-200">
                  <p className="text-xs text-muted-foreground mb-2">
                    Detail Probabilitas:
                  </p>
                  {Object.entries(result.probabilities).map(
                    ([className, prob]) => (
                      <div
                        key={className}
                        className="flex items-center gap-2 mb-1 text-xs"
                      >
                        <span className="w-24 text-muted-foreground">
                          {className}:
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              className === "Normal"
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-right font-medium">
                          {(prob * 100).toFixed(1)}%
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Disclaimer */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-background/50 rounded-lg p-3">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>
                  Hasil ini hanya bersifat skrining awal. Diagnosis akhir harus
                  dikonfirmasi oleh tenaga medis profesional.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassificationSection;
