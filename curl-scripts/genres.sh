URL="http://127.0.0.1:3000/api/genres"
curl -X POST -H "Content-Type: application/json" \
	     -d "{\"name\": \"$1\"}" \
	     $URL


