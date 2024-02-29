const posts = require('../models/post.js');

class Feed {
    async getAll(req, res){
        try {
            const feed = await posts.find({});
            res.send({ok: true, message: "feed receieved", feedList: feed})
        } catch (error) {
            console.log(error);
            res.send({ok: false, message: "error", error})
        }
    }

    async deleteOne(req, res){
        let {_id: thisId} = req.body;
        try {
            const post = await posts.findByIdAndDelete(thisId)
            if(post) {
                const newFeed = await posts.find({});
                res.send({ok: true, message: "post found", found: post, feed: newFeed})
            }
            else res.send({ok: false, message: "post not found"})
        } catch (error) {
            console.log(error);
            res.send({ok: false, message: "error", error})
        }
    }

    async add(req, res){
        let {
            username: user,
            dateFormatted: dateForm,
            dateRaw: dateR,
            albumImage: image_secure_url,
            albumName: album,
            artistName: artist,
            textBody: text
        } = req.body.payload;

        try {
            await posts.create({
                username: user,
                dateFormatted: dateForm,
                dateRaw: dateR,
                albumImage: image_secure_url,
                albumName: album,
                artistName: artist,
                textBody: text
            })
            const feed = await posts.find({});
            res.send({ok:true, messsage:"Post added to DB",
            feedList: feed})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Feed();