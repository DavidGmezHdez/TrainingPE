class Event {
	constructor(idevent, title, author,description, duration, date, createdAt, updatedAt) {
		this.idevent = idevent;
		this.title = title;
		this.author = author;
		this.description = description;
		this.duration = duration;
		this.date = date;
        this.createdAt = createdAt;
        this.updateAt = updatedAt;
	}
}
export default Event;
