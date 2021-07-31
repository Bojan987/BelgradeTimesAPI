import User from "../../model/user";

export const addBookmark = async (req, res, next) => {
    const { idPost } = req.body;
    try {
        const existingUser = await User.findById({ _id: req.userId });
        console.log(idPost);

        const userBookmarks = existingUser.bookmarks;


        if (!userBookmarks || userBookmarks.length === 0) {
            const userMarks = [];
            userMarks.push(idPost);
            console.log(userMarks);
            await User.findByIdAndUpdate({ _id: req.userId }, { bookmarks: userMarks });
            return res.status(201).json({ message: "Bookmark added successfully" });
        }


        if (userBookmarks.length === 25) {
            throw new Error("You can't add any more bookmarks");
        }

        for (let i = 0; i < userBookmarks.length; i++) {
            if (userBookmarks[i] == idPost) {
                throw new Error("You already bookmarked that post");
            }
        }

        const userMarks = existingUser.bookmarks;
        console.log(userMarks);
        userMarks.push(idPost);
        await User.findByIdAndUpdate({ _id: req.userId }, { bookmarks: userMarks });
        return res.status(201).json({ message: "Bookmark added successfully" });

    } catch (error) {
        next(error);

    }
};