extends Control

# Node references - DOUBLE CHECK THESE PATHS MATCH YOUR SCENE
@onready var nama: TextEdit = $Form/Textedit/nama
@onready var kelas: TextEdit = $Form/Textedit/kelas
@onready var npm: TextEdit = $Form/Textedit/npm
@onready var desc: TextEdit = $Form/Textedit/desc

@onready var input: Button = $Form/Buttons/INPUT
@onready var fetch: Button = $Form/Buttons/FETCH
@onready var update: Button = $Form/Buttons/UPDATE
@onready var delete: Button = $Form/Buttons/DELETE



# Called when the node enters the scene tree
func _ready() -> void:
	# Verify all nodes exist
	if not nama:
		push_error("Nama TextEdit not found! Check path.")
	if not input:
		push_error("Input button not found! Check path.")
	
	# Connect buttons
	input.pressed.connect(_on_input_pressed)
	fetch.pressed.connect(_on_fetch_pressed)
	update.pressed.connect(_on_update_pressed)
	delete.pressed.connect(_on_delete_pressed)

	# Connect HTTP signals
	HttpManager.request_success.connect(_on_request_success)
	HttpManager.request_failed.connect(_on_request_failed)

# Button handlers
func _on_input_pressed():
	print("Input button pressed!")
	var data = {
		"nama": nama.text,
		"kelas": kelas.text,
		"npm": npm.text,
		"desc": desc.text
	}
	print("Sending data:", data)
	HttpManager.post_request("/api/test/create", data)

func _on_fetch_pressed():
	HttpManager.get_request("/api/test/read")

func _on_update_pressed():
	
	var data = {
		"nama": nama.text,
		"kelas": kelas.text,
		"npm": npm.text,
		"desc": desc.text
	}
	HttpManager.post_request("/api/test/update", data)
func _on_delete_pressed():
	HttpManager.delete_request("/api/test/delete", {"npm": npm.text})

# Response handlers
func _on_request_success(data, response_code):
	print("Success: ", data)
	if response_code == 200:  # For GET requests
		if data is Array and data.size() > 0:
			update_form(data[0])

func _on_request_failed(error, code):
	push_error("Error ", code, ": ", error)

# Helper function
func update_form(data: Dictionary):
	nama.text = data.get("nama", "")
	kelas.text = data.get("kelas", "")
	npm.text = data.get("npm", "")
	desc.text = data.get("desc", "")
