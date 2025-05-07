extends Node

@onready var tanggal_input: LineEdit = $VBoxContainer/tanggal_input
@onready var jenis_input: LineEdit = $VBoxContainer/jenis_input
@onready var nominal_input: LineEdit = $VBoxContainer/nominal_input
@onready var keterangan_input: LineEdit = $VBoxContainer/keterangan_input
@onready var simpan_btn: Button = $VBoxContainer/simpan_btn
@onready var daftar_catatan: ItemList = $VBoxContainer/daftar_catatan
@onready var http_request: HTTPRequest = $HTTPRequest

const API_URL = "http://localhost:3000/api/pajak"

func _ready() -> void:
	ambildata()
	simpan_btn.pressed.connect(_on_simpan_btn_pressed)
	
func _on_simpan_btn_pressed() -> void:
	var catatan = {
		"tanggal": tanggal_input.text,
		"jenis": jenis_input.text,
		"nominal": nominal_input.text.to_int(),
		"keterangan": keterangan_input.text
		}
	var headers = ["Content-Type: application/json"]
	var body = JSON.stringify(catatan)
	var error = http_request.request(API_URL, headers, HTTPClient.METHOD_POST, body)
	if error != OK:
		print("Gagal kirim data:", error)
	else:
		print("Data dikirim, menunggu respon...") 

func ambildata():
	print("Mengambil data dari server...")
	var error = http_request.request(API_URL)
	if error != OK:
		print("Gagal mengirim permintaan:", error)

func tampilkan_data(data_array):
	daftar_catatan.clear()
	for item in data_array:
		print("Item diterima:", item)
		var teks = "%s | %s | Rp%s | %s" % [
			item.get("tanggal", ""),
			item.get("jenis", ""),
			str(item.get("nominal", 0)),
			item.get("keterangan", "")
			]
		daftar_catatan.add_item(teks)


func _on_http_request_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	print(">> request_completed terpanggil")
	print("Respon HTTP:", response_code)
	if response_code == 200 or response_code == 201:
		var json = JSON.new()
		var parse_result = json.parse(body.get_string_from_utf8())
		if parse_result == OK:
			var data_array = json.get_data()
			
			if typeof(data_array) ==TYPE_ARRAY:
				tampilkan_data(data_array)
			else:
				ambildata()
		else:
			print("Gagal Parse JSON code:", parse_result)
	else:
		print("HTTP error code:", response_code)
