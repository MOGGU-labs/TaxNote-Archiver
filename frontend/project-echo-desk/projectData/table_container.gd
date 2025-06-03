extends VBoxContainer

const RECORD_INFO = preload("res://scenes/record_info.tscn")

func set_client_data(data: Array) -> void:
	# Clear old children
	for child in get_children():
		child.queue_free()
	

	# Create and add record scenes
	for client_dict in data:
		if typeof(client_dict) == TYPE_DICTIONARY:
			var client := ClientData.from_dict(client_dict)
			var record = RECORD_INFO.instantiate()
			add_child(record)
			record.set_data_from_client(client)
			
