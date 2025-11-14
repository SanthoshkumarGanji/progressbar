import React, {useEffect, useState} from 'react';
import {Activity, Database, Globe, MessageSquare, Pause, Play, RotateCcw, Zap} from 'lucide-react';

export default function ArchitectureDiagram() {
    const [isAnimating, setIsAnimating] = useState(true);
    const [activeFlow, setActiveFlow] = useState(0);

    const flows = [
        {name: 'Salesforce Sync', color: '#3b82f6', path: 'salesforce'},
        {name: 'Contact Operations', color: '#8b5cf6', path: 'contact'},
        {name: 'Proposal Processing', color: '#ec4899', path: 'proposal'},
        {name: 'Account Processing', color: '#10b981', path: 'account'},
        {name: 'Document Processing', color: '#f59e0b', path: 'document'},
        {name: 'Kafka Event Stream', color: '#ef4444', path: 'kafka'},
        {name: 'WebSocket Real-time', color: '#8b5cf6', path: 'websocket'}
    ];

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setActiveFlow((prev) => (prev + 1) % flows.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isAnimating]);

    const getAnimationClass = (flowName) => {
        if (!isAnimating) return '';
        return activeFlow === flows.findIndex(f => f.path === flowName) ? 'animate-pulse-flow' : '';
    };

    const getComponentAnimation = (componentName) => {
        if (!isAnimating) return '';
        const currentFlow = flows[activeFlow].path;
        if (currentFlow === componentName ||
            (currentFlow === 'salesforce' && ['salesforce-ui', 'salesforce-db', 'sync', 'contact-db'].includes(componentName)) ||
            (currentFlow === 'contact' && ['contact-db', 'contact-ui', 'progress-ui'].includes(componentName)) ||
            (currentFlow === 'proposal' && ['proposal-ui', 'proposal-db', 'producer'].includes(componentName)) ||
            (currentFlow === 'account' && ['account-ui', 'account-db', 'producer'].includes(componentName)) ||
            (currentFlow === 'document' && ['document-ui', 'document-db', 'producer'].includes(componentName)) ||
            (currentFlow === 'kafka' && ['producer', 'kafka', 'consumer', 'mongodb'].includes(componentName)) ||
            (currentFlow === 'websocket' && ['mongodb', 'websocket', 'progress-ui'].includes(componentName))) {
            return 'animate-glow';
        }
        return '';
    };

    return (
        <div
            className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 overflow-auto">
            <style>{`
        @keyframes pulse-flow {
          0%, 100% { stroke-opacity: 1; stroke-width: 4; }
          50% { stroke-opacity: 0.3; stroke-width: 6; }
        }
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
            transform: scale(1.05);
          }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-pulse-flow {
          animation: pulse-flow 2s ease-in-out infinite, data-flow 2s linear infinite;
          stroke-dasharray: 20 10;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

            <div className="max-w-[1800px] mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">FA Dashboard Architecture - Live Data Flow</h1>

                    {/* Animation Controls */}
                    <div className="flex gap-4 items-center bg-slate-700 rounded-lg p-4">
                        <button
                            onClick={() => setIsAnimating(!isAnimating)}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                            {isAnimating ? <Pause size={20}/> : <Play size={20}/>}
                            {isAnimating ? 'Pause' : 'Play'}
                        </button>
                        <button
                            onClick={() => setActiveFlow(0)}
                            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                            <RotateCcw size={20}/>
                            Reset
                        </button>
                    </div>
                </div>

                {/* Current Flow Indicator */}
                <div className="bg-slate-800 rounded-xl p-4 mb-6 border-2 border-slate-600">
                    <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Active Flow:</span>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full animate-pulse"
                                style={{backgroundColor: flows[activeFlow].color}}
                            />
                            <span className="text-white font-bold text-lg">{flows[activeFlow].name}</span>
                        </div>
                    </div>
                </div>

                {/* Main Container */}
                <div className="relative bg-slate-800 rounded-xl shadow-2xl p-8 border-2 border-slate-600"
                     style={{minHeight: '1200px'}}>

                    {/* SVG for all connection arrows */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                        <defs>
                            <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#64748b"/>
                            </marker>
                            <marker id="arrowhead-blue" markerWidth="12" markerHeight="12" refX="11" refY="6"
                                    orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#3b82f6"/>
                            </marker>
                            <marker id="arrowhead-green" markerWidth="12" markerHeight="12" refX="11" refY="6"
                                    orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#10b981"/>
                            </marker>
                            <marker id="arrowhead-purple" markerWidth="12" markerHeight="12" refX="11" refY="6"
                                    orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#8b5cf6"/>
                            </marker>
                            <marker id="arrowhead-red" markerWidth="12" markerHeight="12" refX="11" refY="6"
                                    orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#ef4444"/>
                            </marker>
                            <marker id="arrowhead-yellow" markerWidth="12" markerHeight="12" refX="11" refY="6"
                                    orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#f59e0b"/>
                            </marker>
                            <marker id="arrowhead-pink" markerWidth="12" markerHeight="12" refX="11" refY="6"
                                    orient="auto">
                                <polygon points="0 0, 12 6, 0 12" fill="#ec4899"/>
                            </marker>
                        </defs>

                        {/* Salesforce Flow */}
                        <line x1="120" y1="115" x2="120" y2="168" stroke="#3b82f6" strokeWidth="3"
                              markerEnd="url(#arrowhead-blue)" className={getAnimationClass('salesforce')}/>
                        <line x1="140" y1="258" x2="140" y2="205" stroke="#3b82f6" strokeWidth="3"
                              markerEnd="url(#arrowhead-blue)" className={getAnimationClass('salesforce')}/>
                        <line x1="200" y1="195" x2="258" y2="195" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('salesforce')}/>
                        <line x1="360" y1="195" x2="418" y2="195" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('salesforce')}/>

                        {/* Contact Flow */}
                        <line x1="480" y1="168" x2="480" y2="115" stroke="#8b5cf6" strokeWidth="3"
                              markerEnd="url(#arrowhead-purple)" className={getAnimationClass('contact')}/>
                        <line x1="500" y1="50" x2="500" y2="103" stroke="#8b5cf6" strokeWidth="3"
                              markerEnd="url(#arrowhead-purple)" className={getAnimationClass('contact')}/>
                        <line x1="580" y1="70" x2="678" y2="70" stroke="#64748b" strokeWidth="3"
                              markerEnd="url(#arrowhead)" className={getAnimationClass('contact')}/>

                        {/* WebSocket Flow */}
                        <line x1="1110" y1="70" x2="1268" y2="70" stroke="#8b5cf6" strokeWidth="3"
                              markerEnd="url(#arrowhead-purple)" className={getAnimationClass('websocket')}/>
                        <line x1="1370" y1="115" x2="1370" y2="398" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('websocket')}/>

                        {/* Proposal Flow */}
                        <line x1="750" y1="215" x2="750" y2="298" stroke="#ec4899" strokeWidth="3"
                              markerEnd="url(#arrowhead-pink)" className={getAnimationClass('proposal')}/>
                        <line x1="770" y1="388" x2="770" y2="305" stroke="#ec4899" strokeWidth="3"
                              markerEnd="url(#arrowhead-pink)" className={getAnimationClass('proposal')}/>
                        <line x1="750" y1="425" x2="750" y2="548" stroke="#ec4899" strokeWidth="3"
                              markerEnd="url(#arrowhead-pink)" className={getAnimationClass('proposal')}/>

                        {/* Account Flow */}
                        <line x1="920" y1="215" x2="920" y2="298" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('account')}/>
                        <line x1="940" y1="388" x2="940" y2="305" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('account')}/>
                        <line x1="920" y1="425" x2="860" y2="548" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('account')}/>

                        {/* Document Flow */}
                        <line x1="1090" y1="215" x2="1090" y2="298" stroke="#f59e0b" strokeWidth="3"
                              markerEnd="url(#arrowhead-yellow)" className={getAnimationClass('document')}/>
                        <line x1="1110" y1="388" x2="1110" y2="305" stroke="#f59e0b" strokeWidth="3"
                              markerEnd="url(#arrowhead-yellow)" className={getAnimationClass('document')}/>
                        <line x1="1090" y1="425" x2="930" y2="548" stroke="#f59e0b" strokeWidth="3"
                              markerEnd="url(#arrowhead-yellow)" className={getAnimationClass('document')}/>

                        {/* Kafka Flow */}
                        <line x1="860" y1="625" x2="860" y2="688" stroke="#ef4444" strokeWidth="4"
                              markerEnd="url(#arrowhead-red)" className={getAnimationClass('kafka')}/>
                        <line x1="860" y1="778" x2="860" y2="848" stroke="#ef4444" strokeWidth="4"
                              markerEnd="url(#arrowhead-red)" className={getAnimationClass('kafka')}/>
                        <line x1="980" y1="895" x2="1228" y2="490" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('kafka')}/>
                        <line x1="1240" y1="510" x2="990" y2="915" stroke="#10b981" strokeWidth="3"
                              markerEnd="url(#arrowhead-green)" className={getAnimationClass('kafka')}/>
                    </svg>

                    {/* Components */}
                    <div className={`absolute ${getComponentAnimation('salesforce-ui')}`}
                         style={{left: '40px', top: '20px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-5 border-3 border-blue-400 w-44 transition-all">
                            <Globe className="mx-auto mb-2 text-white" size={36}/>
                            <div className="text-center font-bold text-sm text-white">Salesforce UI</div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('salesforce-db')}`}
                         style={{left: '40px', top: '170px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-xl p-5 border-3 border-slate-500 w-44 transition-all">
                            <Database className="mx-auto mb-2 text-white" size={36}/>
                            <div className="text-center font-bold text-sm text-white">Salesforce DB</div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('sync')}`}
                         style={{left: '260px', top: '170px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-xl p-5 border-3 border-emerald-400 w-36 transition-all">
                            <Activity className="mx-auto mb-2 text-white" size={36}/>
                            <div className="text-center font-bold text-sm text-white">SYNC</div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('contact-db')}`}
                         style={{left: '420px', top: '170px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-xl p-5 border-3 border-slate-500 w-44 transition-all">
                            <Database className="mx-auto mb-2 text-white" size={36}/>
                            <div className="text-center font-bold text-sm text-white">Contact DB (DB2)</div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('contact-ui')}`}
                         style={{left: '420px', top: '20px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-xl p-5 border-3 border-purple-400 w-44 transition-all">
                            <Activity className="mx-auto mb-2 text-white" size={36}/>
                            <div className="text-center font-bold text-sm text-white">Contact UI/API</div>
                        </div>
                    </div>

                    {/* Main Dashboard */}
                    <div
                        className="absolute bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl shadow-2xl p-8 border-4 border-indigo-500"
                        style={{left: '680px', top: '20px', width: '650px', zIndex: 20}}>

                        <div
                            className={`bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 border-3 border-indigo-400 ${getComponentAnimation('progress-ui')}`}>
                            <Activity className="mx-auto mb-2 text-white" size={40}/>
                            <div className="text-center text-xl font-bold text-white">Progress Bar UI</div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div
                                className={`bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-5 border-3 border-pink-400 transition-all ${getComponentAnimation('proposal-ui')}`}>
                                <Activity className="mx-auto mb-2 text-white" size={32}/>
                                <div className="text-center font-bold text-sm text-white">Proposal UI/API</div>
                            </div>
                            <div
                                className={`bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-5 border-3 border-green-400 transition-all ${getComponentAnimation('account-ui')}`}>
                                <Activity className="mx-auto mb-2 text-white" size={32}/>
                                <div className="text-center font-bold text-sm text-white">Account UI/API</div>
                            </div>
                            <div
                                className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-5 border-3 border-orange-400 transition-all ${getComponentAnimation('document-ui')}`}>
                                <Activity className="mx-auto mb-2 text-white" size={32}/>
                                <div className="text-center font-bold text-sm text-white">Document UI/API</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div
                                className={`bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-lg p-4 border-3 border-slate-500 ${getComponentAnimation('proposal-db')}`}>
                                <Database className="mx-auto mb-2 text-white" size={32}/>
                                <div className="text-center font-bold text-xs text-white">Proposal DB</div>
                            </div>
                            <div
                                className={`bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-lg p-4 border-3 border-slate-500 ${getComponentAnimation('account-db')}`}>
                                <Database className="mx-auto mb-2 text-white" size={32}/>
                                <div className="text-center font-bold text-xs text-white">Account DB</div>
                            </div>
                            <div
                                className={`bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-lg p-4 border-3 border-slate-500 ${getComponentAnimation('document-db')}`}>
                                <Database className="mx-auto mb-2 text-white" size={32}/>
                                <div className="text-center font-bold text-xs text-white">Document DB</div>
                            </div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('producer')}`}
                         style={{left: '720px', top: '550px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-xl p-5 border-3 border-yellow-400 w-64 transition-all">
                            <Zap className="mx-auto mb-2 text-white" size={40}/>
                            <div className="text-center font-bold text-sm text-white">PROGRESS BAR<br/>PRODUCER API
                            </div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('kafka')}`}
                         style={{left: '760px', top: '690px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-xl p-6 border-3 border-red-400 w-52 transition-all">
                            <MessageSquare className="mx-auto mb-2 text-white" size={44}/>
                            <div className="text-center font-bold text-lg text-white">KAFKA</div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('consumer')}`}
                         style={{left: '720px', top: '850px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-xl p-5 border-3 border-cyan-400 w-64 transition-all">
                            <Activity className="mx-auto mb-2 text-white" size={40}/>
                            <div className="text-center font-bold text-sm text-white">PROGRESS BAR<br/>CONSUMER API
                            </div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('mongodb')}`}
                         style={{left: '1230px', top: '400px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl p-5 border-3 border-green-400 w-56 transition-all">
                            <Database className="mx-auto mb-2 text-white" size={40}/>
                            <div className="text-center font-bold text-sm text-white">MongoDB<br/>Session Data</div>
                        </div>
                    </div>

                    <div className={`absolute ${getComponentAnimation('websocket')}`}
                         style={{left: '1270px', top: '20px', zIndex: 20}}>
                        <div
                            className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-xl p-5 border-3 border-indigo-400 w-56 transition-all">
                            <Zap className="mx-auto mb-2 text-white" size={40}/>
                            <div className="text-center font-bold text-sm text-white">WEBSOCKET<br/>Session API</div>
                        </div>
                    </div>
                </div>

                {/* Flow Legend */}
                <div className="mt-8 bg-slate-800 rounded-xl shadow-xl p-6 border-2 border-slate-600">
                    <h3 className="text-xl font-bold mb-4 text-white">Data Flow Sequences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {flows.map((flow, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                                    activeFlow === idx
                                        ? 'bg-slate-700 border-white scale-105'
                                        : 'bg-slate-900 border-slate-600 hover:border-slate-500'
                                }`}
                                onClick={() => setActiveFlow(idx)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full" style={{backgroundColor: flow.color}}/>
                                    <span className="text-white font-semibold">{flow.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}