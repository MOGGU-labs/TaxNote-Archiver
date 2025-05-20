extends Control

#textedits
@onready var client: TextEdit = $form/client
@onready var folder: TextEdit = $form/folder
@onready var author: TextEdit = $form/author
@onready var telp: TextEdit = $form/telp
@onready var alamat: TextEdit = $form/alamat
@onready var npwp: TextEdit = $form/npwp
@onready var nkp: TextEdit = $form/nkp
@onready var http_request: HTTPRequest = $HTTPRequest
#buttons
@onready var send: Button = $form/buttons/Send
@onready var nuke: Button = $form/buttons/NUKE

#global variables
var headers = ["Content-Type: application/json"]
var client_data := {}
var url = "http://localhost:3000/api/clients"

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
func ambilData():
	pass

#send shit
func sendData():
	# Collect input data
	var client_data = {
		"name": client.text.strip_edges(),
		"folderTitle": folder.text.strip_edges(),
		"author": author.text.strip_edges(),
		"phone": telp.text.strip_edges(),
		"address": alamat.text.strip_edges(),
		"npwp": npwp.text.strip_edges(),
		"pkp": int(nkp.text.strip_edges()) if nkp.text.strip_edges() != "" else 0

	}

	var json_string = JSON.stringify(client_data)
	var url = "http://localhost:3000/api/create-folder"  # updated route
	print("Mengirim data:", json_string)

	# Set headers if not already defined
	var headers = ["Content-Type: application/json"]

	var error = http_request.request(
		url,
		headers,
		HTTPClient.METHOD_POST,
		json_string
	)

	if error != OK:
		print("Gagal mengirim permintaan HTTP: ", error)

#signals
func _on_http_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	var body_text = body.get_string_from_utf8()
	var json = JSON.parse_string(body_text)

	if json == null or typeof(json) != TYPE_DICTIONARY:
		print("⚠️ Gagal parsing JSON atau format tidak sesuai.")
		print("Isi body: ", body_text)
		return

	if json.has("error"):
		print("❌ Terjadi error dari server: ", json["error"])
	else:
		print("✅ Berhasil! Response: ", json)


func _on_send_pressed() -> void:
	sendData()

func _on_nuke_pressed() -> void:
	print("☢️ Launching nuke...")

	var http = HTTPRequest.new()
	add_child(http)

	# Always connect BEFORE sending the request
	http.request_completed.connect(_on_http_request_completed)

	var nukeurl = "http://localhost:3000/api/909/warhead/nuke"
	var err = http.request(nukeurl, [], HTTPClient.METHOD_DELETE)

	if err != OK:
		print("❌ HTTP request failed to start: ", err)
