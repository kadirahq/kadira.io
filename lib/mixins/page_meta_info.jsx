Mixins.PageMetaInfoMixin = {
  getMetaInfo(page) {
    var author = {
      name: page.authorName || "Arunoda Susiripala",
      profile: page.authorProfile || "https://twitter.com/arunoda"
    };

    return <div style={{margin: "0 0 10px 0"}}>
      <span className="who">by
        <a style={{margin: "0 5px"}} href={author.profile}>{author.name}</a>
      </span>
       - 
      <span className="date" style={{margin: "0 5px"}}>{ moment(page.date).format("DD, MMMM YYYY") }</span>
    </div>
  }
};