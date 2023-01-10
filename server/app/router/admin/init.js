const Router = require("@koa/router")
const router = new Router()
const Tag = require("../../model/Tag")
const User = require("../../model/User")
const Comment = require("../../model/Comment")
const Article = require("../../model/Article")
const { Auth } = require("../../middleware/auth")
const { AUTH } = require("../../config/constants")

const { mock, Random } = require("mockjs")

function gen_random_ce_data(fnName) {
  return Math.random() < 0.5
    ? Random[fnName]()
    : Random[`c${fnName}`]()
}

router.get(
  "/init/all",
  new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  async ctx => {
    await Tag.deleteMany()
    await User.deleteMany()
    await Article.deleteMany()
    await Comment.deleteMany()

    ctx.body = {
      message: "初始化成功"
    }
  }
)

router.get(
  "/init/superadmin",
  // new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  async ctx => {
    ctx.body = await new User({
      name: "Momento",
      nickName: "Momento",
      email: "806118207@qq.com",
      password: "123",
      description: "这是一个无趣的人！！！",
      avatar_url:
        "https://portrait.gitee.com/uploads/avatars/user/712/2136585_MarMomento_1598408243.png!avatar30",
      type: "SuperAdmin",
      site_admin: true
    }).save()
  }
)

router.get(
  "/init/tags",
  new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  async ctx => {
    await Tag.deleteMany()

    const tags = [
      {
        name: "javascript",
        description:
          "Once relegated to the browser as one of the 3 core technologies of the web, JavaScript can now be found almost anywhere you find code. ",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--QiqFhwmE--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/16/js-badge.png"
      },
      { name: "webdev", description: "", avatar_url: "" },
      {
        name: "beginners",
        description:
          '"A journey of a thousand miles begins with a single step." -Chinese Proverb',
        avatar_url: ""
      },
      {
        name: "react",
        description:
          "Official tag for Facebook's React JavaScript library for building user interfaces",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--Hx4s8tX---/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/26/react-sticker.png"
      },
      {
        name: "programming",
        description: "",
        avatar_url: ""
      },
      {
        name: "python",
        description: "import antigravity",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--AqHNoO65--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/20/57795360-bec24f00-7713-11e9-9516-20f5f5d0f034.png"
      },
      {
        name: "tutorial",
        description:
          "Tutorial is a general purpose tag. We welcome all types of tutorial - code related or not! It's all about learning, and using tutorials to teach others!",
        avatar_url: ""
      },
      {
        name: "productivity",
        description:
          "Productivity includes tips on how to use tools and software, process optimization, useful references, experience, and mindstate optimization.",
        avatar_url: ""
      },
      {
        name: "css",
        description:
          "Cascading Style Sheets (CSS) is a simple language for adding style (e.g., fonts, colors, spacing) to HTML documents. It describes how HTML elements should be displayed.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--LBduLDHs--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/18/57795357-be29b880-7713-11e9-9748-b08c782b58d7.png"
      },
      {
        name: "discuss",
        description: "What color should the bike shed be?",
        avatar_url: ""
      },
      {
        name: "codenewbie",
        description:
          "The most supportive community of programmers and people learning to code.",
        avatar_url: ""
      },
      {
        name: "android",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--ZNZqM01O--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/85/android-badge.png"
      },
      {
        name: "node",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--gROBFAy1--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/23/node-sticker.png"
      },
      { name: "html", description: "", avatar_url: "" },
      {
        name: "devops",
        description:
          "Content centering around the shifting left of responsibility, deconstruction of responsibility silos, and the automation of repetitive work tasks.",
        avatar_url: ""
      },
      {
        name: "career",
        description:
          "This tag is for anything relating to careers! Job offers, workplace conflict, interviews, resumes, promotions, etc.",
        avatar_url: ""
      },
      {
        name: "aws",
        description:
          "Amazon Web Services (AWS) is a collection of web-services for computing, storage, machine learning, security, and more There are over 150+ AWS service with new services being announced yearly.",
        avatar_url: ""
      },
      {
        name: "showdev",
        description: "Show off what you've built!",
        avatar_url: ""
      },
      {
        name: "java",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--j6NiXruY--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/19/57803385-45802780-7726-11e9-84d9-2e4c4ca8bcdb.png"
      },
      {
        name: "typescript",
        description:
          "Optional static type-checking for JavaScript.",
        avatar_url: ""
      },
      { name: "github", description: "", avatar_url: "" },
      {
        name: "linux",
        description:
          "What are clouds made of? Linux servers, mostly.",
        avatar_url: ""
      },
      {
        name: "opensource",
        description:
          "May The Source Be With You! Articles about Open Source and Free Software as a philosophy, and its application to software development and project management.",
        avatar_url: ""
      },
      {
        name: "angular",
        description:
          "One of the world's most popular frontend JavaScript frameworks.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--fNBdZ1DX--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/28/angular-sticker.png"
      },
      {
        name: "php",
        description:
          "Home for all the PHP-related posts on Dev.to!",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--9ZSmEJj7--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/21/php-elephant.png"
      },
      {
        name: "vue",
        description:
          "Official tag for the Vue.js JavaScript Framework",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--KflrVC4o--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/27/vue-sticker.png"
      },
      { name: "security", description: "", avatar_url: "" },
      { name: "testing", description: "", avatar_url: "" },
      {
        name: "ruby",
        description:
          "This tag is for posts related to the Ruby language, including its libraries.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--f0WP7n7p--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/17/57802960-3482e680-7725-11e9-9354-77712df6a949.png"
      },
      { name: "laravel", description: "", avatar_url: "" },
      {
        name: "docker",
        description:
          "Stories about Docker as a technology (containers, CLI, Engine) or company (Docker Hub, Docker Swarm).",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--7L1txQC1--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/87/docker-badge.png"
      },
      {
        name: "go",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--1lX38geu--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/34/gopher-badge.png"
      },
      {
        name: "database",
        description:
          "Posts on building, using, and learning about databases.",
        avatar_url: ""
      },
      { name: "dotnet", description: "", avatar_url: "" },
      {
        name: "machinelearning",
        description: "",
        avatar_url: ""
      },
      {
        name: "100daysofcode",
        description:
          "The 100 Days of Code is a coding challenge created by Alexander Kallaway to encourage people to learn new coding skills.",
        avatar_url: ""
      },
      {
        name: "csharp",
        description:
          "Official tag for the C programming language.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--Y240oqxN--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/33/csharp-badge.png"
      },
      {
        name: "git",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--HaftsN5---/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/22/git-sticker.png"
      },
      {
        name: "azure",
        description:
          "The dev.to tag for Microsoft Azure, the Cloud Computing Platform.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--7hpeo0cM--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/86/azure-badge.png"
      },
      {
        name: "serverless",
        description: "All computing — without servers!",
        avatar_url: ""
      },
      {
        name: "computerscience",
        description:
          "This tag is for sharing and asking questions about anything related to computer science, including data structures, algorithms, research, and white papers! 🤓",
        avatar_url: ""
      },
      {
        name: "algorithms",
        description:
          "Heap, Binary Tree, Data Structure it doesn't matter. This tag should be used for anything Algorithm & Data Structure focused.",
        avatar_url: ""
      },
      {
        name: "cloud",
        description:
          "There is no cloud, only other peoples computers.",
        avatar_url: ""
      },
      {
        name: "rails",
        description:
          "Ruby on Rails is a popular web framework that happens to power [dev.to](/) ❤️",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--2N8R6WvF--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/32/rails-badge.png"
      },
      {
        name: "help",
        description:
          "A place to ask questions and provide answers. We're here to work things out together.",
        avatar_url: ""
      },
      { name: "vscode", description: "", avatar_url: "" },
      {
        name: "architecture",
        description: "",
        avatar_url: ""
      },
      { name: "flutter", description: "", avatar_url: "" },
      {
        name: "kubernetes",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--XXaJdQCT--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/88/kubernetes-badge.png"
      },
      { name: "codepen", description: "", avatar_url: "" },
      {
        name: "ios",
        description:
          "This tag is for anything related to Apple's iOS devices, operating system, and development environment. Development, usage, apps, tips, requests for help: if it's related to iOS it's welcome here!",
        avatar_url: ""
      },
      {
        name: "datascience",
        description:
          "Data Science allows us to extract meaning from and interpret data.",
        avatar_url: ""
      },
      {
        name: "watercooler",
        description: "Light, and offtopic conversation.",
        avatar_url: ""
      },
      { name: "mobile", description: "", avatar_url: "" },
      {
        name: "graphql",
        description:
          "GraphQL is a query language and execution engine for client‐server applications",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--lcaw_Emg--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/29/graphql-sticker.png"
      },
      {
        name: "wordpress",
        description: "",
        avatar_url: ""
      },
      {
        name: "news",
        description:
          "Expect to see announcements of new and updated products, services, and features for languages & frameworks. You also will find high-level news relevant to the tech and software development industry covered here.",
        avatar_url: ""
      },
      {
        name: "reactnative",
        description: "",
        avatar_url: ""
      },
      { name: "learning", description: "", avatar_url: "" },
      { name: "coding", description: "", avatar_url: "" },
      {
        name: "django",
        description:
          "Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.",
        avatar_url: ""
      },
      {
        name: "blockchain",
        description: "",
        avatar_url: ""
      },
      {
        name: "codequality",
        description: "",
        avatar_url: ""
      },
      { name: "startup", description: "", avatar_url: "" },
      {
        name: "todayilearned",
        description:
          "Summarize a concept that is new to you.",
        avatar_url: ""
      },
      {
        name: "development",
        description: "",
        avatar_url: ""
      },
      {
        name: "sql",
        description:
          "Posts on tips and tricks, using and learning about SQL for database development and analysis.",
        avatar_url: ""
      },
      {
        name: "ux",
        description:
          "User Experience tips, tricks, discussions, and more!",
        avatar_url: ""
      },
      {
        name: "rust",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--4RD0-X0v--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/35/rust-badge.png"
      },
      { name: "kotlin", description: "", avatar_url: "" },
      {
        name: "nextjs",
        description:
          "Next.js gives you hybrid static and server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--5fTLhkYu--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/89/next-js-badge.png"
      },
      { name: "writing", description: "", avatar_url: "" },
      {
        name: "performance",
        description:
          "Tag for content related to software performance.",
        avatar_url: ""
      },
      {
        name: "agile",
        description:
          "Agile! A iterative and time boxed approach to software development where you build software incrementally from the start instead of trying to deliver all at once.",
        avatar_url: ""
      },
      {
        name: "functional",
        description: "",
        avatar_url: ""
      },
      { name: "frontend", description: "", avatar_url: "" },
      { name: "ai", description: "", avatar_url: "" },
      { name: "api", description: "", avatar_url: "" },
      { name: "npm", description: "", avatar_url: "" },
      {
        name: "postgres",
        description:
          "Posts on tips and tricks, using and learning about PostgreSQL for database development and analysis.",
        avatar_url: ""
      },
      {
        name: "ubuntu",
        description:
          "Canonical, Ubuntu, Linux and related technology.",
        avatar_url: ""
      },
      {
        name: "bash",
        description: "",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--pdVaH0Ym--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/24/shell-sticker.png"
      },
      { name: "gamedev", description: "", avatar_url: "" },
      { name: "mongodb", description: "", avatar_url: "" },
      {
        name: "womenintech",
        description: "",
        avatar_url: ""
      },
      {
        name: "dart",
        description: "On the language, SDK and ecosystem.",
        avatar_url: ""
      },
      {
        name: "devjournal",
        description: "Dear Diary...",
        avatar_url: ""
      },
      { name: "swift", description: "", avatar_url: "" },
      {
        name: "mysql",
        description:
          "Posts on tips and tricks, using and learning about MySQL for database development and analysis.",
        avatar_url: ""
      },
      {
        name: "tailwindcss",
        description:
          "Rapidly build modern websites without ever leaving your HTML",
        avatar_url: ""
      },
      {
        name: "motivation",
        description: "",
        avatar_url: ""
      },
      {
        name: "firebase",
        description:
          "Firebase helps you build and run successful apps. It offers products and solutions you can rely on through your app's journey.",
        avatar_url: ""
      },
      {
        name: "oop",
        description:
          '"...because thinking inside the box is okay, as long as it\'s a black box."',
        avatar_url: ""
      },
      {
        name: "svelte",
        description:
          "Tag to discuss Svelte, a JavaScript component framework, which aims at being simple and efficient.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--I5cBviU---/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/84/svelte-badge.png"
      },
      {
        name: "cpp",
        description:
          "Official tag for the C++ programming language.",
        avatar_url:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--lRZA1qmc--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/95/cpp_logo.png"
      },
      {
        name: "elixir",
        description:
          "This is where we talk about all thing related to the Elixir language, including it's surrounding OTP ecosystem.",
        avatar_url: ""
      },
      { name: "redux", description: "", avatar_url: "" },
      { name: "code", description: "", avatar_url: "" },
      {
        name: "technology",
        description: "",
        avatar_url: ""
      },
      { name: "remote", description: "", avatar_url: "" }
    ]

    ctx.body = await Tag.insertMany(tags)
  }
)

router.get(
  "/init/users",
  new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  async ctx => {
    await User.deleteMany({ name: { $ne: "Momento" } })

    const nums = Random.range(0, 10)
    let i = 0

    const data = mock({
      "users|20": [
        {
          name: () => "test" + nums[i++],
          password: "123",
          nickName: () => gen_random_ce_data("name"),
          "type|1": ["User", "Admin"],
          email: () => Random.email(),
          description: () => gen_random_ce_data("sentence")
        }
      ]
    })

    ctx.body = await User.insertMany(data.users)
  }
)

router.get(
  "/init/articles",
  new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  async ctx => {
    await Article.deleteMany()

    const tags = await Tag.find()
    const users = await User.find()
    const tagIds = tags.map(tag => tag._id.toString())
    const userIds = users.map(user => user._id.toString())

    const data = mock({
      "articles|20": [
        {
          title: () => gen_random_ce_data("title"),
          content: () => gen_random_ce_data("paragraph"),
          tags: () => Random.pick(tagIds, 2, 4),
          author: () => Random.pick(userIds)
        }
      ]
    })
    const articles = await Article.insertMany(data.articles)

    for (article of articles) {
      await User.findByIdAndUpdate(
        article.author.toString(),
        {
          $push: { articles: article._id }
        }
      )

      for (tag of article.tags) {
        await Tag.findByIdAndUpdate(tag.toString(), {
          $inc: { articles_count: 1 }
        })
      }
    }

    ctx.body = articles
  }
)

router.get(
  "/init/comments",
  new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  async ctx => {
    await Comment.deleteMany()

    const users = await User.find()
    const articles = await Article.find()
    const userIds = users.map(user => user._id.toString())
    const articleIds = articles.map(article =>
      article._id.toString()
    )

    const data = mock({
      "comments|40": [
        {
          content: () => gen_random_ce_data("sentence"),
          commentator: () => Random.pick(userIds),
          article_id: () => Random.pick(articleIds)
        }
      ]
    })

    const comments = await Comment.insertMany(data.comments)

    for (comment of comments) {
      await Article.findByIdAndUpdate(
        comment.article_id.toString(),
        {
          $inc: { comment_count: 1 }
        }
      )
    }

    ctx.body = comments
  }
)

module.exports = router
