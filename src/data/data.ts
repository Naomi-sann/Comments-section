export interface User {
  image: {
    png: string | null,
    webp: string | null,
  },
  username: string,
}

interface CommentBody {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

export interface CommentReply extends CommentBody {
  replyingTo: string;
  replies?: CommentReply[];
}

export interface Comment extends CommentBody {
  replies: CommentReply[];
}

export interface Datas {
  currentUser: User,
  comments: Comment[]
}

const datas: Datas = {
  currentUser: {
    image: {
      png: "images/avatars/image-juliusomo.png",
      webp: "images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "images/avatars/image-amyrobson.png",
          webp: "images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "images/avatars/image-maxblagun.png",
          webp: "images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "images/avatars/image-ramsesmiron.png",
              webp: "image/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "images/avatars/image-juliusomo.png",
              webp: "images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
    {
      id: 5,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "3 month ago",
      score: 2,
      user: {
        image: {
          png: "images/avatars/image-juliusomo.png",
          webp: "images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    },
    {
      id: 6,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "3 month ago",
      score: 2,
      user: {
        image: {
          png: "images/avatars/image-ramsesmiron.png",
          webp: "images/avatars/image-ramsesmiron.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    },
  ],
};

export default datas;
