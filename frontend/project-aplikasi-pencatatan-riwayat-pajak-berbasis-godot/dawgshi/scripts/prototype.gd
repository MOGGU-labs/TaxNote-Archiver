extends Control
@onready var http_request: HTTPRequest = $HTTPRequest
@onready var refresh: Button = $BuatLaporan/VBoxContainer2/HBoxContainer/Refresh
@onready var timer: Timer = $Timer

var response_received := false

# on starting app (
func _ready() -> void:
	#self explanatory
	ambildata()

#mengambil data dan refresh
#ambil
func ambildata():
	response_received = false
	var url = "http://localhost:3000/api/status"
	print("Mengambil data dari server:", url)
	timer.start()  # Mulai timer sebelum request
	http_request.request(url)
	
#refresh
func refreshdata():
	print("Refresh data...")
	ambildata()

#tombol refresh
func _on_button_pressed() -> void:
	refreshdata()

#FUCKING SIGNALS
#on http request completed
func _on_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	
	if timer.is_stopped() == false:
		timer.stop()
	response_received = true
	
	var body_text = body.get_string_from_utf8()
	var json = JSON.parse_string(body_text)
	
	if typeof(json) != TYPE_DICTIONARY:
		print("Gagal parsing JSON atau format tidak sesuai.")
		return
		
	if json.has("error"):
		print("Terjadi error dari server: ", json["error"])
	else:
		print("Berhasil! Response: ", json)


func _on_timeout() -> void:
	if response_received == false:
		print("Timeout: Gagal terhubung ke server dalam batas waktu.")
