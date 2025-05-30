# client_data.gd
class_name ClientData extends Node
#DATA CLASS
var id_client: int
var client_uuid: String
var client_code: String
var nama_client: String
var badan_usaha: String
var telp: String
var alamat: String
var npwp: String
var nkp: String
var keterangan: String
var created_at: String
var updated_at: String
var is_deleted: bool
var deleted_at: Variant  # Accepts any type including null


static func safe_get(dict: Dictionary, key: String, default_value) -> Variant:
	return dict[key] if dict.has(key) and dict[key] != null else default_value

# Constructor from Dictionary
static func from_dict(dict: Dictionary) -> ClientData:
	var client := ClientData.new()
	client.id_client = safe_get(dict, "id_client", 0)
	client.client_uuid = safe_get(dict, "client_uuid", "")
	client.client_code = safe_get(dict, "client_code", "")
	client.nama_client = safe_get(dict, "nama_client", "")
	client.badan_usaha = safe_get(dict, "badan_usaha", "")
	client.telp = safe_get(dict, "telp", "")
	client.alamat = safe_get(dict, "alamat", "")
	client.npwp = safe_get(dict, "npwp", "")
	client.nkp = safe_get(dict, "nkp", "")
	client.keterangan = safe_get(dict, "keterangan", "")
	client.created_at = safe_get(dict, "created_at", "")
	client.updated_at = safe_get(dict, "updated_at", "")
	client.is_deleted = safe_get(dict, "is_deleted", false)
	client.deleted_at = dict.get("deleted_at", null)  # Allow explicit null
	return client


# Optional: format for display
func to_display_string() -> String:
	return "Code: %s | Name: %s | Type: %s | Tel: %s | Addr: %s | NPWP: %s | NKP: %s | Notes: %s | Updated: %s |" % [
		client_code,
		nama_client,
		badan_usaha,
		telp,
		alamat,
		npwp,
		nkp,
		keterangan,
		updated_at,
	]
