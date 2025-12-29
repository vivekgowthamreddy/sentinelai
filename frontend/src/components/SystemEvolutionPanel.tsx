import { motion } from 'framer-motion';

interface SystemEvolutionPanelProps {
    level: number;
}

const levels = [
    { level: 0, title: "PHASE 0: MONITOR", desc: "Passive observation. Logging threats.", color: "bg-blue-500", text: "text-blue-400" },
    { level: 1, title: "PHASE 1: HEURISTICS", desc: "Blocking known signatures.", color: "bg-yellow-500", text: "text-yellow-400" },
    { level: 2, title: "PHASE 2: ACTIVE DEFENSE", desc: "Real-time threat neutralisation.", color: "bg-orange-500", text: "text-orange-400" },
    { level: 3, title: "PHASE 3: TOTAL LOCKDOWN", desc: "Full system control. Zero Trust.", color: "bg-red-600", text: "text-red-500" },
];

const SystemEvolutionPanel = ({ level }: SystemEvolutionPanelProps) => {
    const current = levels[Math.min(level, 3)];

    return (
        <div className="card p-6 border-t font-mono">
            <h3 className="text-sm font-medium text-(--color-text-secondary) mb-4">SYSTEM EVOLUTION STATUS</h3>

            <div className="flex gap-1 mb-6 h-2">
                {levels.map((l) => (
                    <div
                        key={l.level}
                        className={`flex-1 rounded-full transition-all duration-500 ${level >= l.level ? l.color : 'bg-gray-800'
                            } ${level === l.level ? 'animate-pulse shadow-lg shadow-' + l.color.replace('bg-', '') + '/50' : ''}`}
                    />
                ))}
            </div>

            <motion.div
                key={level}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <div className={`p-3 rounded-lg bg-black/30 border border-white/10 ${current.text}`}>
                    <div className="text-3xl font-bold">{current.level}</div>
                </div>
                <div>
                    <div className={`text-lg font-bold ${current.text}`}>{current.title}</div>
                    <div className="text-sm text-(--color-text-secondary)">{current.desc}</div>
                </div>
            </motion.div>

            {level >= 2 && (
                <div className="mt-4 text-xs text-gray-500 border-l-2 border-red-500 pl-3 py-1">
                    SYSTEM HAS TAKEN CONTROL OF BROWSER NAVIGATION
                </div>
            )}
        </div>
    );
};

export default SystemEvolutionPanel;
