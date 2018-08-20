export const playerActions = {

    AUDIO_PAUSED: 'AUDIO_PAUSED',
    AUDIO_PLAYING: 'AUDIO_PLAYING',

    audioPaused: () => ({
        type: playerActions.AUDIO_PAUSED
    }),
    audioPlaying: () => ({
        type: playerActions.AUDIO_PLAYING
    }),
}