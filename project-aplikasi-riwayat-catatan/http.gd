extends Node

@onready var http_request: HTTPRequest = $HTTPRequest
#test input data
func _ready():
	var catatan = {
		"tanggal": "2025-05-07",
		"jenis" : "PPN",
		"nominal" : "200000",
		"keterangan" : "Bayar PPN bulan Mei"
		
	}
#simpan input data
func simpan_catatan():
	pass
#respon server
func _on_HTTPRequest_request_completed():
	pass
