
import { Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  onAudioData?: (audioBlob: Blob) => void;
  visualizerBars?: number;
  className?: string;
}

export function AIVoiceInput({
  onStart,
  onStop,
  onAudioData,
  visualizerBars = 48,
  className
}: AIVoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      onStop?.(time);
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [isRecording, time, onStart, onStop]);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio analysis
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      analyserRef.current = analyser;
      
      // Animate audio levels
      const animate = () => {
        if (analyser && isRecording) {
          analyser.getByteFrequencyData(dataArray);
          const levels = Array.from(dataArray.slice(0, visualizerBars)).map(value => value / 255);
          setAudioLevels(levels);
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animate();

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onAudioData?.(audioBlob);
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setAudioLevels([]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setHasPermission(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (hasPermission === false) {
      checkMicrophonePermission();
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <button
          className={cn(
            "group w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
            isRecording
              ? "bg-red-500/20 hover:bg-red-500/30"
              : "bg-slate-800/50 hover:bg-slate-700/50"
          )}
          type="button"
          onClick={handleClick}
          disabled={hasPermission === null}
        >
          {isRecording ? (
            <div className="w-6 h-6 rounded-sm bg-red-500 animate-pulse" />
          ) : (
            <Mic className={cn(
              "w-6 h-6 transition-colors",
              hasPermission === false ? "text-red-400" : "text-white/70"
            )} />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            isRecording
              ? "text-red-400"
              : "text-white/50"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-8 w-64 flex items-center justify-center gap-0.5">
          {[...Array(visualizerBars)].map((_, i) => {
            const level = audioLevels[i] || 0;
            return (
              <div
                key={i}
                className={cn(
                  "w-0.5 rounded-full transition-all duration-100",
                  isRecording
                    ? "bg-red-400/70"
                    : "bg-white/20"
                )}
                style={{
                  height: isRecording ? `${Math.max(4, level * 32)}px` : '4px'
                }}
              />
            );
          })}
        </div>

        <p className="h-4 text-xs text-white/70 text-center">
          {hasPermission === false 
            ? "Clique para permitir acesso ao microfone" 
            : isRecording 
              ? "Gravando... Clique para parar" 
              : "Clique para gravar sua voz"
          }
        </p>
      </div>
    </div>
  );
}
