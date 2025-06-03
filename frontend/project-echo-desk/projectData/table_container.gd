extends VBoxContainer

const RECORDS = preload("res://projectData/records.tscn")

func set_client_data(data: Array, current_page: int, page_size: int) -> void:
	for child in get_children():
		child.queue_free()

	for i in data.size():
		var client = ClientData.from_dict(data[i])
		var entry = RECORDS.instantiate()
		add_child(entry)
		entry.set_data_from_client(client, current_page, page_size, i)
