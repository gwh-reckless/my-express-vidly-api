## 3rd-lib

- express
- mongoose : https://mongoosejs.com/docs/queries.html
- joi
- joi-objectid

## model:

### Genre

Field:

- name string min(5) max(50) requied

### Customer

Field :

- isGold boolean default:false
- name string min(5) max(50) required
- phone string min(5) max(5)

### Movie

- title string min(5) max(255) required
- genre genreSchema required
- numberInStock Number min(0) max (^i255) required
- dailyRentalRate Number min(0) max(255) required
- publishDate stirng

### Rental

- customer customerSchema required
- movie movieSchema required
- dateOut Date default:date.now
- dateReturned
- rentalFee min(0)

### User

- name string
- email string
- password string
- isAdmin boolean
# my-express-vidly-api
