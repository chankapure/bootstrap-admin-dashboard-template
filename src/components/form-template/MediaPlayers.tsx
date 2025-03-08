
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MediaPlayers = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };
  
  const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    
    // Convert regular YouTube URL to embed URL if needed
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        setYoutubeUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setYoutubeUrl(url);
      }
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        setYoutubeUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setYoutubeUrl(url);
      }
    } else {
      setYoutubeUrl(url);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Players</CardTitle>
        <CardDescription>
          Audio and video players with YouTube embedding support.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Audio Player */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Audio Player</h3>
          <audio 
            ref={audioRef}
            controls 
            className="w-full" 
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          >
            Your browser does not support the audio element.
          </audio>
          <p className="text-sm text-muted-foreground">
            Native HTML5 audio player with browser controls.
          </p>
        </div>
        
        {/* Video Player */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Video Player</h3>
          <div className="relative overflow-hidden rounded-lg bg-black aspect-video">
            <video 
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              className="w-full h-full object-contain"
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={togglePlay}>
              {playing ? "Pause" : "Play"}
            </Button>
            <Button variant="outline" onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setPlaying(true);
              }
            }}>
              Restart
            </Button>
          </div>
        </div>
        
        {/* YouTube Embed */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">YouTube Embed</h3>
          <div>
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <div className="flex space-x-2 mt-1">
              <Input 
                id="youtube-url"
                placeholder="Enter YouTube URL"
                value={youtubeUrl}
                onChange={handleYoutubeChange}
              />
              <Button 
                onClick={() => {
                  // Force iframe refresh
                  const temp = youtubeUrl;
                  setYoutubeUrl('');
                  setTimeout(() => setYoutubeUrl(temp), 100);
                }}
              >
                Load
              </Button>
            </div>
          </div>
          
          <div className="aspect-video rounded-lg overflow-hidden">
            {youtubeUrl && (
              <iframe
                width="100%"
                height="100%"
                src={youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaPlayers;
