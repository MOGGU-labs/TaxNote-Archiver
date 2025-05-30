extends VBoxContainer

const RECORD_INFO = preload("res://scenes/record_info.tscn")

func _populate_list(job) -> void:
	var body = job.response_body.get_string_from_utf8()
	var data = JSON.parse_string(body)

	if typeof(data) == TYPE_ARRAY:
		for client_dict in data:
			var client := ClientData.from_dict(client_dict)
			_add_client_record(client)
	else:
		print("Unexpected data:", data)
		
func _add_client_record(client: ClientData) -> void:
	var record = RECORD_INFO.instantiate()
	add_child(record)
	record.set_data_from_client(client)


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	$HTTPManager.connect("completed", func(): print("✅ All jobs completed"))
	$HTTPManager.job("http://localhost:3000/clients"
	).charset(
		"utf-8"
	).on_success(func(job):
		_populate_list(job)

	).fetch()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
