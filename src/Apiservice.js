import Baseurl from "./components/Baseurl";

const baseurl = Baseurl();

export class API {
  static Login(body) {
    return fetch(baseurl + "/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static Logout(token) {
    return fetch(baseurl + "/rest-auth/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Register(body) {
    return fetch(baseurl + "/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  // Profile APIs

  static Getuser(token) {
    return fetch(baseurl + "/api/profiles/curuser/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static ProfilepictureUpdate(uploadData, token) {
    return fetch(baseurl + "/api/profiles/pictureupdate/", {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: uploadData,
    }).then((resp) => resp.json());
  }
  static ChangePassword(body, token) {
    return fetch(baseurl + "/rest-auth/password/change/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static DeletePicture(token) {
    return fetch(baseurl + "/api/profiles/picturedelete/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  // Posts APIs
  static Postsubmit(uploadData, token) {
    return fetch(baseurl + `/api/posts/newpost/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token['mr-token']}`,
      },
      body: uploadData,
    }).then((resp) => resp.json());
  }
  static Userposts(token) {
    return fetch(baseurl + `/api/posts/myposts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Deletepost(post, token) {
    return fetch(baseurl + `/api/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  
  static Getposts(token) {
    return fetch(baseurl + "/api/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Getselectedpost(post, token) {
    return fetch(baseurl + `/api/posts/${post.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Commentsubmit(uploadData, post, token) {
    return fetch(baseurl + `/api/comments/newcomment/${post.id}/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token['mr-token']}`,
      },
      body: uploadData,
    }).then((resp) => resp.json());
  }
  static GetCommentspost(post, token) {
    return fetch(baseurl + `/api/comments/getcomments/${post.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Postcheck(post, token){
    return fetch(baseurl + `/api/posts/postcheck/${post.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    })
    .then((resp) => resp.json());
  }
  static Postlike(body, post, token) {
    return fetch(baseurl + `/api/posts/postlike/${post.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify(body),
    })
    .then((resp) => resp.json());
  }
  // Comments APIs
  static CommentLike(body, comment, token) {
    return fetch(baseurl + `/api/comments/commentlike/${comment.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify(body),
    })
    .then((resp) => resp.json());
  }
  static CommentDelete(comment, token) {
    return fetch(baseurl + `/api/comments/${comment.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      }})
    .then((resp) => resp.json());
  }

  static CommentUpdate(body, comment, token) {
    return fetch(baseurl + `/api/comments/${comment.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token['mr-token']}`,
      },
      body: body,
    })
    .then((resp) => resp.json());
  }

  // Polls APIs
  static Getpolls(token) {
    return fetch(baseurl + "/api/polls/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Latestpoll(token) {
    return fetch(baseurl + "/api/polls/latestpoll/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((resp) => resp.json());
  }
  static Pollsubmit(uploadData, token) {
    return fetch(baseurl+ "/api/polls/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token['mr-token']}`,
      },
      body: uploadData,
    }).then((resp) => resp.json());
  }
  static Pollvote(body, poll, token) {
    return fetch(baseurl+ `/api/polls/pollvote/${poll.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token['mr-token']}`,
      },
      body: body,
    }).then((resp) => resp.json());
  }
}
