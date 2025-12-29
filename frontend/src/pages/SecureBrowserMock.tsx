import { useState } from 'react';
import Topbar from "../components/Topbar";
import { browserNavigate } from '../api/sentinelApi';
import { motion, AnimatePresence } from 'framer-motion';

const SecureBrowserMock = () => {
    const [url, setUrl] = useState("http://google.com");
    const [content, setContent] = useState<string | null>(null);
    const [status, setStatus] = useState<"IDLE" | "LOADING" | "ALLOWED" | "BLOCKED">("IDLE");
    const [blockReason, setBlockReason] = useState("");
    const [consequence, setConsequence] = useState("");

    const handleNavigate = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("LOADING");
        try {
            const res = await browserNavigate(url);
            if (res.status === "BLOCKED") {
                setStatus("BLOCKED");
                setBlockReason(res.reason);
                setConsequence(res.consequences);
            } else {
                setStatus("ALLOWED");
                setContent(res.content);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <Topbar title="Secure Browser Environment" subtitle="Simulated Sandbox for Malware Testing" />

            <div className="p-6 flex-1 flex flex-col max-w-5xl mx-auto w-full">
                {/* Browser UI Bar */}
                <div className="bg-gray-800 rounded-t-xl p-3 flex gap-4 items-center border border-gray-700">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <form onSubmit={handleNavigate} className="flex-1">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 font-mono"
                        />
                    </form>
                    <button onClick={handleNavigate} className="text-gray-400 hover:text-white">
                        ➜
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white relative overflow-hidden rounded-b-xl border-x border-b border-gray-700">
                    <AnimatePresence mode='wait'>
                        {status === "BLOCKED" ? (
                            <motion.div
                                key="blocked"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-red-950 flex flex-col items-center justify-center text-white p-8 text-center"
                            >
                                <div className="text-6xl mb-6">🛑</div>
                                <h2 className="text-3xl font-bold mb-2 text-red-500">SYSTEM INTERVENTION</h2>
                                <p className="text-xl font-mono text-red-200 mb-8">{blockReason}</p>

                                {consequence && (
                                    <div className="max-w-2xl bg-black/40 border border-red-500/30 rounded-xl p-6 mb-8 text-left">
                                        <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                            ⚠️ POTENTIAL CONSEQUENCES
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {consequence}
                                        </p>
                                    </div>
                                )}

                                <div className="bg-red-900/20 p-4 rounded text-sm font-mono border border-red-500/20 text-red-300">
                                    Sentinel Immune System has seized control of this session to prevent system compromise.
                                </div>
                            </motion.div>
                        ) : status === "ALLOWED" ? (
                            <motion.div
                                key="allowed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-gray-100 p-8 flex flex-col items-center justify-center text-gray-800"
                            >
                                <h1 className="text-4xl font-bold mb-4">Welcome to the Web</h1>
                                <p>You have successfully navigated to:</p>
                                <code className="bg-gray-200 p-2 rounded mt-2">{url}</code>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-400">
                                Enter a URL to test the Sentinel Browser Protection
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                    * This is a simulated browser environment running within the SentinelAI Sandbox.
                </div>
            </div>
        </div>
    );
};

export default SecureBrowserMock;
