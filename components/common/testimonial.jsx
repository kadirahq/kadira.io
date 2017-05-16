Components.Testimonial = React.createClass({
  render() {
    return <div className="testimonial-block">
      <div className="row">
        <div className="col-md-4 avatar">
          <img src={this.props.avatar} alt={this.props.person} />
          <p className="hidden-xs">
            { this.props.person }<br />
            <strong>{this.props.position} - <a target="_blank" href={this.props.link}>{this.props.name}</a></strong>
          </p>
        </div>
        <div className="col-md-8 quote">
          <span dangerouslySetInnerHTML={{__html:this.props.quote}}/>
          <br />
          <span className="visible-xs">
            {this.props.person} -
            <strong>{this.props.position} - <a href={this.props.link}>{this.props.name}</a></strong>
          </span>
        </div>
      </div>
    </div>
  }
});
