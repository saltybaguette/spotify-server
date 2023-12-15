import * as dao from "./dao.js";
import {addLikedSong} from "./dao.js";
//let currentUser = null;
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        req.session['currentUser'] = user;
        res.json(user);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserByUsername = async (req, res) => {
        const {userName} = req.params;
        const user = await dao.findUserByUsername(userName);
        res.json(user);
    }

    const findAllFollowers = async (req, res) => {
        const {userId} = req.params;
        const followers = await dao.findAllFollowers(userId);
        res.json(followers);
    };

    const findAllFollowing = async (req, res) => {
        const {userId} = req.params;
        const following = await dao.findAllFollowing(userId);
        res.json(following);
    };

    const findLikedSongs = async (req, res) => {
        const { userId } = req.params;
        const likedSongs = await dao.findLikedSongs(userId);
        res.json(likedSongs);
    };

    const findLikedAlbums = async (req, res) => {
        const following = await dao.findLikedAlbums();
        res.json(following);
    };


    const addLikedSong = async (req, res) => {
        const { userId, songName } = req.params;
        const status = await dao.addLikedSong(userId, songName);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };

    const addLikedAlbum = async (req, res) => {
        const { userId, albumName } = req.params;
        const status = await dao.addLikedAlbum(userId, albumName);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };



    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };

    const addFollowing = async (req, res) => {
        const {userId,name} = req.params;
        const currentUser = await dao.addFollowing(userId,name);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    const addFollower = async (req, res) => {
        const {userId, name} = req.params;
        const status = await dao.addFollower(userId,name);
        res.json(status);
    };

    const removeSong = async (req, res) => {
        const {userId, song} = req.params;
        const currentUser = await dao.removeSong(userId, song);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    const removeAlbum = async (req, res) => {
        const {userId, album} = req.params;
        const currentUser = await dao.removeAlbum(userId, album);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };



    const removeFollowing = async (req, res) => {
        const {userId,name} = req.params;
        const currentUser = await dao.removeFollowing(userId,name);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    const removeFollower = async (req, res) => {
        const {userId, name} = req.params;
        const status = await dao.removeFollower(userId,name);
        res.json(status);
    };





    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.get("/api/users/username/:userName", findUserByUsername);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
    app.get("/api/users/followers/:userId", findAllFollowers);
    app.get("/api/users/following/:userId", findAllFollowing);
    app.get("/api/users/liked/albums/:userId", findLikedAlbums);
    app.get("/api/users/liked/songs/:userId", findLikedSongs);
    app.put("/api/users/add/song/:userId/:songName", addLikedSong);
    app.put("/api/users/add/album/:userId/:albumName", addLikedAlbum);
    app.put("/api/users/follow/:userId/:name", addFollowing);
    app.put("/api/users/follower/:userId/:name", addFollower);
    app.post("/api/users/remove/song/:userId/:song", removeSong);
    app.post("/api/users/remove/album/:userId/:album", removeAlbum);
    app.post("/api/users/remove/follower/:userId/:name", removeFollower);
    app.post("/api/users/remove/following/:userId/:name", removeFollowing);
}
export default UserRoutes;