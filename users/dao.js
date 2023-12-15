import model from "./model.js";
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const createUser = (user) => model.create(user);
export const findAllFollowers = (userId) => model.findById(userId, 'followers');
export const findAllFollowing = (userId) => model.findById(userId, 'following');
export const findLikedSongs = (userId) => model.findById(userId, 'liked_songs');
export const findLikedAlbums = (userId) => model.findById(userId, 'liked_albums');
export const addLikedSong = (userId, song) => model.findByIdAndUpdate(userId, {$addToSet: {liked_songs: song}}, {new:true});
export const addLikedAlbum = (userId, album) => model.findByIdAndUpdate(userId, {$addToSet: {liked_albums: album}}, {new:true});
export const addFollowing = (userId, name) => model.findByIdAndUpdate(userId, {$addToSet: {following:name}}, {new:true});
export const addFollower = (userId, name) => model.findByIdAndUpdate(userId, {$addToSet: {followers:name}}, {new:true});
export const removeSong = (userId, song) => model.findByIdAndUpdate(userId, {$pull: {liked_songs: song}}, {new:true});
export const removeAlbum = (userId, album) => model.findByIdAndUpdate(userId, {$pull: {liked_albums: album}}, {new:true});
export const removeFollowing = (userId, name) => model.findByIdAndUpdate(userId, {$pull: {following:name}}, {new:true});
export const removeFollower = (userId, name) => model.findByIdAndUpdate(userId, {$pull: {followers:name}}, {new:true});

    // model.updateOne({ _id: userId}, { $addToSet: {liked_songs: song}});