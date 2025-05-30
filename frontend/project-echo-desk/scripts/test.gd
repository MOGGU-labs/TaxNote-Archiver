extends Control

@onready var item_list: ItemList = $ItemList

func _ready() -> void:
	$HTTPManager.connect("completed", func(): print("✅ All jobs completed")
	)


func _on_button_pressed() -> void:
	$HTTPManager.job("http://localhost:3000/clients"
	).charset(
		"utf-8"
	).on_success(func(job):
		_populate_list(job)

	).fetch()

func _populate_list(job):
		var body = job.response_body.get_string_from_utf8()
		var data = JSON.parse_string(body)

		if typeof(data) == TYPE_ARRAY:
			item_list.clear()
			for client_dict in data:
				var client := ClientData.from_dict(client_dict)
				item_list.add_item(client.to_display_string())
		else:
			print("Unexpected data:", data)
