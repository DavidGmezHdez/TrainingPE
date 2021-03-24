class Event {
	constructor(idevent, title,description, duration, date, createdAt, updatedAt) {
		this.idevent = idevent;
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.date = date;
        this.createdAt = createdAt;
        this.updateAt = updatedAt;
	}
}
export default Event;
