import mongoos from 'mongoose';

const tiktokSchema = mongoos.Schema({
    url: String,
    channel: String,
    song: String,
    likes: String,
    messages: String,
    description: String,
    shares: String,
});

export default mongoos.model('tiktokVideos', tiktokSchema);