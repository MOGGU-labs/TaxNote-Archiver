extends Control

@onready var input_nama: LineEdit = $VBoxContainer/InputNama
@onready var input_kelas: LineEdit = $VBoxContainer/InputKelas
@onready var input_npm: LineEdit = $VBoxContainer/InputNPM
@onready var input_id: LineEdit = $VBoxContainer/InputID
@onready var item_list: ItemList = $VBoxContainer/ItemList
@onready var get_: Button = $VBoxContainer/HBoxContainer/GET

@onready var get_all: Button = $"VBoxContainer/HBoxContainer/GET ALL"
@onready var create: Button = $VBoxContainer/HBoxContainer/CREATE
@onready var update: Button = $VBoxContainer/HBoxContainer/UPDATE
@onready var delete: Button = $VBoxContainer/HBoxContainer/DELETE
@onready var delete_all: Button = $"VBoxContainer/HBoxContainer/DELETE ALL"


func _ready() -> void:
	get_all.pressed.connect(_on_get_all_pressed)
	create.pressed.connect(_on_create_pressed)
	update.pressed.connect(_on_update_pressed)
	delete.pressed.connect(_on_delete_pressed)
	delete_all.pressed.connect(_on_delete_all_pressed)

	# Connect centralized HttpManager signals
	HttpManager.request_success.connect(_on_request_success)
	HttpManager.request_failed.connect(_on_request_failed)
	HttpManager.data_received.connect(_on_data_loaded)
	HttpManager.connect("request_success", Callable(self, "_on_data_loaded"))

	
	# Load all data at start
	_on_get_all_pressed()

func _on_get_all_pressed() -> void:
	HttpManager.get_request("api/data")

func _on_get_pressed() -> void:
	var id = input_id.text.strip_edges()
	if id == "":
		push_error("")
		return
	HttpManager.get_request("api/data/" + id)  # Make sure the endpoint uses '/' before the ID

func _on_create_pressed() -> void:
	var data = {
		"nama": input_nama.text,
		"kelas": input_kelas.text,
		"npm": input_npm.text
	}
	HttpManager.post_request("api/data", data)

func _on_update_pressed() -> void:
	var id = input_id.text.strip_edges()
	if id == "":
		push_error("ID is required for update")
		return
	var data = {
		"nama": input_nama.text,
		"kelas": input_kelas.text,
		"npm": input_npm.text
	}
	HttpManager.put_request("api/data/" + id, data)

func _on_delete_pressed() -> void:
	var id = input_id.text.strip_edges()
	if id == "":
		push_error("ID is required for delete")
		return
	HttpManager.delete_request("api/data/" + id, {})

func _on_delete_all_pressed() -> void:
	HttpManager.delete_request("api/data", {})

func _on_request_success(data, code) -> void:
	if code >= 200 and code < 300:
		if typeof(data) == TYPE_ARRAY:
			_update_item_list(data)
		else:
			print("Operation successful:", data)
			_on_get_all_pressed() # refresh list after any change
	else:
		push_error("Unexpected success response code or data")

func _on_request_failed(msg, err_code) -> void:
	push_error("HTTP request failed: %s (Code: %d)" % [msg, err_code])

func _on_data_loaded(data:Dictionary, response_code) -> void:
	if response_code != 200:
		push_error("Failed to load data")
		return
	
	input_nama.text = data.get("nama", "")
	input_kelas.text = data.get("kelas", "")
	input_npm.text = data.get("npm", "")
func _update_item_list(items: Array) -> void:
	item_list.clear()
	for item in items:
		var display_text = "ID: %s | Nama: %s | Kelas: %s | NPM: %s" % [
			str(item.get("id", "")),
			item.get("nama", ""),
			item.get("kelas", ""),
			item.get("npm", "")
		]
		item_list.add_item(display_text)
