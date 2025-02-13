# Dokumentacja Techniczna - DeskBooker

## 1. Wstęp

### **Opis aplikacji**

DeskBooker to aplikacja webowa umożliwiająca **rezerwację biurek** w przestrzeni biurowej. System pozwala użytkownikom na przeglądanie dostępnych biurek, dokonywanie rezerwacji oraz ich anulowanie. Administratorzy mają dodatkowe uprawnienia do zarządzania biurkami i użytkownikami.

### **Główne funkcjonalności**

- **Rejestracja i logowanie użytkowników** (obsługa autoryzacji JWT).
- **Przegląd i rezerwacja biurek**.
- **Anulowanie rezerwacji**.
- **Zarządzanie użytkownikami i biurkami przez administratora**.

### **Technologie**

#### Backend:

- **Node.js** – serwer aplikacji.
- **Express.js** – framework backendowy.
- **MongoDB** – baza danych.
- **Mongoose** – ODM dla MongoDB.
- **JWT** – autoryzacja użytkowników.

#### Frontend:

- **React.js** – framework do budowy interfejsu użytkownika.
- **Vite** – narzędzie do budowania aplikacji React.
- **React Router** – obsługa routingu.
- **React Query** – zarządzanie stanem i fetchowanie danych.
- **Styled Components** – stylizacja komponentów.

### **Struktura folderów aplikacji**

```
DeskBooker/
│── controllers/             # Kontrolery obsługujące logikę aplikacji
│   ├── authController.js    # Kontroler odpowiedzialny za uwierzytelnianie użytkowników
│   ├── deskController.js    # Kontroler zarządzający rezerwacjami biurek
│   ├── userController.js    # Kontroler zarządzający użytkownikami
│
│── errors/                  # Obsługa błędów w aplikacji
│   ├── customErrors.js      # Definicje niestandardowych błędów
│
│── middleware/              # Środkowe warstwy aplikacji (middleware)
│   ├── authMiddleware.js    # Middleware do autoryzacji użytkowników
│   ├── errorHandlerMiddleware.js # Middleware obsługujące błędy aplikacji
│   ├── validationMiddleware.js  # Middleware do walidacji danych wejściowych
│
│── models/                  # Modele danych dla aplikacji
│   ├── DeskModel.js         # Model reprezentujący biurka w bazie danych
│   ├── UserModel.js         # Model reprezentujący użytkowników w bazie danych
│
│── my-booking-app/          # Frontend aplikacji (React)
│   │── node_modules/        # Zależności frontendu
│   │── public/              # Publiczne zasoby aplikacji
│   │── src/                 # Główny katalog kodu źródłowego Reacta
│   │   ├── assets/          # Zasoby statyczne
│   │   │   ├── css/         # Pliki CSS
│   │   │   │   ├── index.css # Główny plik stylów
│   │   │   ├── images/      # Obrazy
│   │   │   ├── wrappers/    # Niestandardowe wrappery komponentów
│   │   │   ├── react.svg    # Logo React
│   │   ├── components/      # Komponenty interfejsu użytkownika
│   │   ├── pages/           # Strony aplikacji
│   │   ├── utils/           # Narzędzia pomocnicze dla Reacta
│   │   ├── App.jsx          # Główny komponent aplikacji
│   │   ├── index.css        # Główny plik stylów
│   │   ├── main.jsx         # Punkt wejściowy aplikacji
│   │── index.html           # Główny plik HTML aplikacji
│   │── package.json         # Zależności i konfiguracja frontendu
│   │── vite.config.js       # Konfiguracja Vite (narzędzia do budowania)
│
│── node_modules/            # Zależności backendowe (Node.js)
│
│── routes/                  # Definicje tras (endpointów API)
│   ├── authRouter.js        # Trasy związane z autoryzacją
│   ├── deskRouter.js        # Trasy do zarządzania biurkami
│   ├── userRouter.js        # Trasy użytkowników
│
│── utils/                   # Narzędzia pomocnicze backendu
│   ├── tokenUtils.js        # Obsługa tokenów JWT
│   ├── passwordUtils.js     # Funkcje do hashowania i weryfikacji haseł
│   ├── constants.js         # Stałe używane w aplikacji
│
│── .env                     # Plik konfiguracyjny środowiska (np. zmienne API, klucze)
│── package.json             # Zależności i konfiguracja backendu
│── server.js                # Główny plik serwera Node.js.
```

### **Instalacja i uruchomienie aplikacji**

1. **Pobranie kodu źródłowego**

   ```sh
   git clone [https://github.com/user/deskbooker.git](https://github.com/HannyaMask07/my-booking-app.git)
   cd my-booking-app
   ```

2. **Instalacja zależności**

   ```sh
   npm run setup-project
   ```

   *(Instaluje zależności dla backendu i frontendowego folderu `my-booking-app`)*

3. **Uruchomienie aplikacji**

   ```sh
   npm run dev
   ```

   *(Uruchamia zarówno backend, jak i frontend jednocześnie.)*

---

## 2. Struktura Bazy Danych (MongoDB)

### Opis

DeskBooker wykorzystuje **MongoDB** jako bazę danych NoSQL do przechowywania informacji o użytkownikach i biurkach. Struktura bazy danych składa się z dwóch głównych kolekcji:

- **Users** – przechowuje dane użytkowników.
- **Desks** – przechowuje informacje o biurkach i ich rezerwacjach.

### **Konfiguracja bazy danych**

Aby skonfigurować połączenie z bazą danych MongoDB, należy wykonać następujące kroki:

1. **Stworzenie pliku w głównym katalogu projektu**

   ```plaintext
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/deskbooker
   JWT_SECRET=your_secret_key
   PORT=5100
   ```

2. **Zainstalowanie zależnych pakietów (jeśli nie zainstalowały się przy setupie)**

   ```sh
   npm install mongoose dotenv
   ```

3. **Połączenie z bazą danych w `server.js`**

   ```javascript
   import mongoose from "mongoose";
   import * as dotenv from "dotenv";
   dotenv.config();

   /// reszta kodu

   try {
     await mongoose.connect(process.env.MONGO_URL);
     console.log("MongoDB connected...");
   } catch (error) {
     console.log("Database connection failed", error);
     process.exit(1);
   }
   ```

### **Modele**

#### **User Model (****`models/UserModel.js`****)**

Model użytkownika przechowuje podstawowe informacje o użytkownikach aplikacji oraz ich role.

```javascript
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "LastName",
  },
  location: {
    type: String,
    default: "Krakow",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
```

**Opis pól:**

- `name`, `email`, `password` – podstawowe dane użytkownika.
- `lastName` – domyślna wartość „LastName”, można edytować.
- `location` – lokalizacja użytkownika.
- `role` – określa poziom uprawnień (`user` lub `admin`).
- `timestamps: true` – automatycznie dodaje daty utworzenia i aktualizacji użytkownika.
- `toJSON()` – usuwa pole `password` przed zwróceniem danych użytkownika.

---

#### **Desk Model (****`models/DeskModel.js`****)**

Model biurka przechowuje informacje o stanowiskach pracy, ich statusie oraz rezerwacjach.

```javascript
import mongoose from "mongoose";
import { DESK_STATUS, DESK_TYPE, DESK_LOCATION } from "../utils/constants.js";

const DeskSchema = new mongoose.Schema({
  deskNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: [String],
    required: true,
    enum: Object.values(DESK_LOCATION),
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(DESK_STATUS),
    default: DESK_STATUS.AVAILABLE,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(DESK_TYPE),
    default: DESK_TYPE.STANDARD,
  },
  bookedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  startTime: Date,
  endTime: Date,
}, { timestamps: true });

export default mongoose.model("Desk", DeskSchema);
```

**Opis pól:**

- `deskNumber` – unikalny numer biurka.
- `location` – lokalizacja biurka, np. `Sector A`.
- `status` – dostępność biurka (`available`, `booked`).
- `type` – rodzaj biurka (`standard`, `standing` itd.).
- `bookedBy` – ID użytkownika, który zarezerwował biurko.
- `startTime`, `endTime` – czas trwania rezerwacji.
- `timestamps: true` – automatycznie zapisuje datę utworzenia i modyfikacji wpisu.

**Relacja z użytkownikami:**
Każde biurko może być powiązane z użytkownikiem za pomocą pola `bookedBy`, które przechowuje ID użytkownika z modelu `User`.

---

#### **Constants (****`utils/constants.js`****)**

Plik `constants.js` zawiera stałe używane w aplikacji, w tym statusy biurek, ich typy oraz dostępne lokalizacje. Modele **User** i **Desk** odwołują się do tych wartości, aby zapewnić spójność danych.

```javascript
export const DESK_STATUS = {
  AVAILABLE: "available",
  BOOKED: "booked",
  OUT_OF_SERVICE: "out_of_service",
};

export const DESK_TYPE = {
  STANDARD: "standard",
  STANDING: "standing",
  MEETING: "meeting",
};

export const DESK_AMENITIES = {
  MOUSE: "Mouse",
  SINGLE_MONITOR: "Single Monitor",
  KEYBOARD: "Keyboard",
  TWO_MONITORS: "Two Monitors",
  LAPTOP_STAND: "Laptop Stand",
  HEADSET: "Headset",
  PRINTER: "Printer",
  DOCKING_STATION: "Docking station",
};

export const DESK_SORT_BY = {
  BOOKED_FIRST: "Booked",
  AVAILABLE_FIRST: "Available",
  ASCENDING: "Highest",
  DESCENDING: "Lowest",
};

export const DESK_LOCATION = {
  SECTOR_A: "Sector A",
  SECTOR_B: "Sector B",
  SECTOR_C: "Sector C",
  SECTOR_D: "Sector D",
};

```

**Opis:**

- `DESK_STATUS` – określa dostępność biurek (`available`, `booked`).
- `DESK_TYPE` – definiuje typy biurek (`standard`, `standing`, `private`).
- `DESK_LOCATION` – dostępne lokalizacje biurek w biurze (`Sector A`, `Sector B`, `Sector C`).
- `DESK_AMENITIES` – określa wyposarzenie biurka (`Two Monitors`, `Mouse`, `Headset`).

Modele `DeskModel.js` odwołują się do tych wartości w polach `status`, `type` i `location`, zapewniając ograniczenie danych do określonych wartości.

---

# **Backend – Kontrolery i Routy**

## **3.1 Struktura backendu**
Backend aplikacji **DeskBooker** został zbudowany w oparciu o **Express.js** i działa jako **REST API** obsługujące operacje CRUD na użytkownikach i biurkach.  

### **Główne moduły backendu:**
- **Kontrolery (`controllers/`)** – obsługują logikę biznesową aplikacji.
- **Routy (`routes/`)** – definiują dostępne endpointy API i przekazują żądania do odpowiednich kontrolerów.
- **Middleware (`middleware/`)** – pośredniczy w obsłudze żądań (np. autoryzacja, walidacja).
- **Modele (`models/`)** – schematy danych MongoDB.

---

## **3.2 Kontrolery i powiązane routy**
Każdy kontroler implementuje logikę dla określonego zasobu, a powiązane pliki routów mapują odpowiednie endpointy na funkcje kontrolera.

---

## **3.2.1 Autoryzacja – `authController.js` & `authRouter.js`**

### **Opis**
Obsługuje rejestrację, logowanie i wylogowanie użytkowników. Wykorzystuje:
- **Bcrypt** do hashowania haseł.
- **JWT** do autoryzacji użytkowników.
- **Middleware walidacji** (`validateRegisterInput`, `validateLoginInput`).

### **Routy – `authRouter.js`**
| Metoda | Ścieżka          | Opis |
|--------|-----------------|------|
| `POST` | `/api/auth/register` | Rejestracja nowego użytkownika |
| `POST` | `/api/auth/login`    | Logowanie użytkownika |
| `GET`  | `/api/auth/logout`   | Wylogowanie użytkownika |

**Implementacja Routera**
```javascript
import { Router } from "express";
const router = Router();
import { login, logout, register } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
```
---

## **3.2.2 Zarządzanie biurkami – `deskController.js` & `deskRouter.js`**

### **Opis**
Obsługuje operacje CRUD dla biurek oraz rezerwacje.

### **Routy – `deskRouter.js`**
| Metoda  | Ścieżka               | Opis |
|---------|----------------------|------|
| `GET`   | `/api/desks`         | Pobranie listy biurek |
| `GET`   | `/api/desks/booked`  | Pobranie rezerwacji użytkownika |
| `POST`  | `/api/desks`         | Tworzenie nowego biurka |
| `PATCH` | `/api/desks/:id`     | Aktualizacja biurka |
| `DELETE`| `/api/desks/:id`     | Usunięcie biurka |
| `PATCH` | `/api/desks/:id/book` | Rezerwacja biurka |
| `PATCH` | `/api/desks/:id/cancelBooking` | Anulowanie rezerwacji |

**Implementacja Routera**
```javascript
import { Router } from "express";
const router = Router();
import {
  getAllDesks,
  getDesk,
  deleteDesk,
  updateDesk,
  createDesk,
  BookDesk,
  getUserBookedDesk,
  CancelBooking,
} from "../controllers/deskController.js";
import { validateDeskInput, validateIdParam } from "../middleware/validationMiddleware.js";

router.route("/booked").get(getUserBookedDesk);
router.route("/").get(getAllDesks).post(createDesk, validateDeskInput);

router
  .route("/:id")
  .get(validateIdParam, getDesk)
  .patch(validateIdParam, updateDesk)
  .delete(validateIdParam, deleteDesk);

router.patch("/:id/book", validateIdParam, BookDesk);
router.patch("/:id/cancelBooking", validateIdParam, CancelBooking);

export default router;
```
---

## **3.2.3 Zarządzanie użytkownikami – `userController.js` & `userRouter.js`**

### **Opis**
Obsługuje operacje na użytkownikach:
- Pobieranie danych aktualnego użytkownika.
- Pobieranie wszystkich użytkowników (admin).
- Aktualizacja profilu.
- Pobieranie statystyk aplikacji.

### **Routy – `userRouter.js`**
| Metoda  | Ścieżka               | Opis |
|---------|----------------------|------|
| `GET`   | `/api/users/current-user` | Pobranie danych aktualnego użytkownika |
| `GET`   | `/api/users/getUserById/:id` | Pobranie użytkownika po ID |
| `GET`   | `/api/users/all-users` | Pobranie wszystkich użytkowników |
| `GET`   | `/api/users/admin/app-stats` | Pobranie statystyk aplikacji (admin) |
| `PATCH` | `/api/users/update-user` | Aktualizacja użytkownika |

**Implementacja Routera**
```javascript
import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  getApplicationStats,
  getCurrentUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

router.get("/current-user", getCurrentUser);
router.get("/getUserById/:id", getUserById);
router.get("/all-users", getAllUsers);
router.get("/admin/app-stats", [authorizePermissions("admin"), getApplicationStats]);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
```
---

## **3.3 Przykłady funkcji kontrolera**

## **3.3.1 Jak routy współpracują z kontrolerami?**
Router Express.js określa dostępne ścieżki API.
Middleware walidacji sprawdza poprawność danych wejściowych.
Kontroler obsługuje żądanie, wykonuje logikę biznesową i komunikuje się z bazą danych przez modele.
Odpowiedź JSON jest zwracana do użytkownika.

### Przykładowy przepływ – Rezerwacja biurka
Użytkownik wysyła żądanie:
```http
PATCH /api/desks/65abc123456/book
Authorization: Bearer <JWT_TOKEN>
```
Router **deskRouter.js** przekazuje żądanie do **BookDesk** w **deskController.js**.
Kontroler sprawdza dostępność biurka, aktualizuje jego status w bazie i zwraca odpowiedź:
```json
{
  "msg": "Desk booked successfully",
  "desk": { "id": "65abc123456", "status": "booked" }
}
```

## 3.3.2 Przykłady implementacji kontrollera 
###Tworzenie biurka – createDesk (DeskController)
Tworzenie biurka to operacja **POST** na endpoint **/api/desks**. Kontroler przyjmuje dane wejściowe, waliduje je i zapisuje nowe biurko do bazy danych.

### Implementacja (JavaScript)
```javascript
export const createDesk = async (req, res) => {
  try {
    // Tworzenie nowego biurka na podstawie danych z requesta
    const desk = await Desk.create(req.body);

    // Zwracamy nowo utworzone biurko
    res.status(StatusCodes.CREATED).json({ desk });
  } catch (error) {
    // Obsługa błędów np. walidacyjnych
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
```

### Przykładowe żądanie
```http
POST /api/desks
Content-Type: application/json

{
  "deskNumber": 25,
  "location": "Sector B",
  "status": "available",
  "type": "standard"
}
```

### Przykładowa odpowiedź
```json
{
  "desk": {
    "_id": "65abc987654",
    "deskNumber": 25,
    "location": "Sector B",
    "status": "available",
    "type": "standard",
    "createdAt": "2024-02-13T12:00:00.000Z"
  }
}
```

### Rezerwacja biurka – BookDesk (DeskController)
Rezerwacja biurka to operacja **PATCH** na endpoint **/api/desks/:id/book**. Kontroler sprawdza, czy biurko jest dostępne, a następnie przypisuje je do użytkownika.

### Implementacja (JavaScript)
```javascript
export const BookDesk = async (req, res) => {
  try {
    // Sprawdzenie, czy użytkownik nie ma już zarezerwowanego biurka
    const existingBooking = await Desk.findOne({ bookedBy: req.user.userId });

    if (existingBooking) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User has already booked another desk" });
    }

    // Pobranie biurka na podstawie ID
    const desk = await Desk.findById(req.params.id);

    if (!desk) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Desk not found" });
    }

    // Sprawdzenie dostępności biurka
    if (desk.status !== "available") {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Desk is not available for booking" });
    }

    // Aktualizacja danych biurka
    desk.bookedBy = req.user.userId;
    desk.status = "booked";

    const updatedDesk = await desk.save();

    res.status(StatusCodes.OK).json({
      msg: "Desk booked successfully",
      desk: updatedDesk,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
```

### Przykładowe żądanie
```http
PATCH /api/desks/65abc123456/book
Authorization: Bearer <JWT_TOKEN>
```

### Przykładowa odpowiedź
```json
{
  "msg": "Desk booked successfully",
  "desk": {
    "_id": "65abc123456",
    "deskNumber": 12,
    "location": "Sector A",
    "status": "booked",
    "bookedBy": "65def789012"
  }
}
```
---

## **Podsumowanie**
- **Kontrolery** implementują logikę biznesową.
- **Routy** łączą ścieżki API z odpowiednimi funkcjami kontrolera.
- **Middleware** waliduje dane i zabezpiecza dostęp.
- **Express.js** obsługuje komunikację między klientem a serwerem.

## 4. Obsługa błędów, Middleware i Utils

### 4.1 Obsługa błędów (errors/)

Aby zapewnić spójne i przejrzyste zarządzanie błędami w aplikacji, w folderze `errors/` zdefiniowano dedykowane klasy błędów. Każdy błąd dziedziczy po klasie `Error`, a jego kod statusu HTTP pochodzi z biblioteki `http-status-codes`.

#### 4.1.1 Klasy błędów – `customErrors.js`

Plik `customErrors.js` zawiera klasy błędów używane w aplikacji:

| Klasa                  | Status HTTP        | Opis                                 |
| ---------------------- | ------------------ | ------------------------------------ |
| `NotFoundError`        | `404 Not Found`    | Zasób nie został znaleziony          |
| `BadRequestError`      | `400 Bad Request`  | Niepoprawne zapytanie                |
| `UnauthenticatedError` | `401 Unauthorized` | Brak uwierzytelnienia użytkownika    |
| `UnauthorizedError`    | `403 Forbidden`    | Brak uprawnień do wykonania operacji |

**Przykład użycia:**

```javascript
import { NotFoundError } from "../errors/customErrors.js";

if (!desk) {
  throw new NotFoundError("Desk not found");
}
```

### 4.2 Middleware (`middleware/`)

Middleware obsługuje funkcje pośrednie, takie jak uwierzytelnianie, autoryzacja, obsługa błędów i walidacja danych wejściowych.

#### 4.2.1 Middleware autoryzacji – `authMiddleware.js`

Obsługuje uwierzytelnianie użytkownika za pomocą JWT oraz autoryzację dostępu na podstawie ról.

| Funkcja                | Opis                                                |
| ---------------------- | --------------------------------------------------- |
| `authenticateUser`     | Weryfikuje token JWT użytkownika                    |
| `authorizePermissions` | Sprawdza, czy użytkownik ma odpowiednie uprawnienia |

**Przykład użycia:**

```javascript
import { authenticateUser } from "../middleware/authMiddleware.js";

router.get("/protected-route", authenticateUser, (req, res) => {
  res.json({ msg: "Dostęp przyznany" });
});
```

#### 4.2.2 Obsługa błędów – `errorHandlerMiddleware.js`

Centralny middleware do obsługi błędów, który loguje je i zwraca spójną odpowiedź API.

**Kod:**

```javascript
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg =
    err.message || "something went wrong, try again at different time";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
```

**Przykład użycia:**

```javascript
app.use(errorHandlerMiddleware);
```

#### 4.2.3 Middleware walidacji – `validationMiddleware.js`

Obsługuje walidację danych wejściowych za pomocą `express-validator`.

| Metoda walidacji          | Opis                                                     |
| ------------------------- | -------------------------------------------------------- |
| `validateDeskInput`       | Sprawdza, czy podano lokalizację biurka                  |
| `validateIdParam`         | Weryfikuje poprawność ID i sprawdza, czy biurko istnieje |
| `validateRegisterInput`   | Weryfikuje dane rejestracyjne użytkownika                |
| `validateLoginInput`      | Sprawdza poprawność danych logowania                     |
| `validateUpdateUserInput` | Weryfikuje poprawność danych aktualizacji profilu        |
| `validateBookingInput`    | Sprawdza poprawność danych rezerwacji                    |

**Przykład walidacji rezerwacji biurka:**

```javascript
export const validateBookingInput = withValidationErrors([
  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((endTime, { req }) => {
      const startTime = req.body.startTime;
      if (!startTime) {
        throw new BadRequestError(
          "Start time must be provided before checking end time"
        );
      }
      if (new Date(endTime) <= new Date(startTime)) {
        throw new BadRequestError("End time must be later than start time");
      }
      return true;
    }),
]);
```

**Przykład użycia:**

```javascript
router.patch("/:id/book", validateIdParam, validateBookingInput, BookDesk);
```

**Przykład walidacji Rejestracji w `validationMiddleware.js`:**

```javascript
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);
```

**Przykład użycia:**

```javascript
router.post("/register", validateRegisterInput, register);
```

### 4.3 Narzędzia (`utils/`)

#### 4.3.1 Narzędzia do haseł – `passwordUtils.js`

Obsługuje hashowanie haseł oraz ich porównywanie za pomocą `bcryptjs`.

| Funkcja           | Opis                                   |
| ----------------- | -------------------------------------- |
| `hashPassword`    | Haszuje podane hasło                   |
| `comparePassword` | Porównuje podane hasło z zaszyfrowanym |

**Przykład użycia:**

```javascript
const hashedPassword = await hashPassword("mypassword");
```

#### 4.3.2 Narzędzia do tokenów – `tokenUtils.js`

Obsługuje tworzenie i weryfikację tokenów JWT.

| Funkcja     | Opis                             |
| ----------- | -------------------------------- |
| `createJWT` | Tworzy token JWT                 |
| `verifyJWT` | Weryfikuje poprawność tokena JWT |

**Przykład użycia:**

```javascript
const token = createJWT({ userId: user._id });
const decoded = verifyJWT(token);
```

### 4.4 Podsumowanie

- `errors/` zawiera klasy błędów, zapewniając czytelną obsługę wyjątków.
- `middleware/` obsługuje autoryzację, walidację i błędy.
- `utils/` dostarcza funkcje pomocnicze do obsługi JWT i haseł.

---
## **5. Server.js**

Plik `server.js` jest głównym punktem wejściowym backendu aplikacji DeskBooker. Odpowiada za inicjalizację serwera Express, konfigurację middleware, podłączenie do bazy danych MongoDB oraz obsługę tras API.

### **5.1. Importowanie Modułów i Konfiguracja Środowiska**

Na początku plik importuje wymagane moduły oraz ładuje zmienne środowiskowe z pliku `.env`.

```javascript
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
```

### \*\*Moduły używane w \*\***`server.js`**

| Moduł                  | Opis                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `express`              | Framework do obsługi serwera API                            |
| `morgan`               | Logger HTTP do rejestrowania zapytań w trybie deweloperskim |
| `mongoose`             | Biblioteka ODM dla MongoDB                                  |
| `cookieParser`         | Middleware do obsługi ciasteczek                            |
| `express-async-errors` | Obsługuje błędy asynchroniczne w Express                    |

### **5.2. Importowanie Routerów**

Serwer obsługuje różne endpointy API, które są zarządzane przez dedykowane routery:

```javascript
import deskRouter from "./routes/deskRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
```

| Router       | Opis                                                            |
| ------------ | --------------------------------------------------------------- |
| `deskRouter` | Obsługuje operacje CRUD dla biurek i rezerwacji                 |
| `authRouter` | Obsługuje rejestrację, logowanie i wylogowanie użytkowników     |
| `userRouter` | Obsługuje operacje na użytkownikach, w tym aktualizację profilu |

### **5.3. Importowanie Middleware**

Middleware zapewniają dodatkowe funkcjonalności, takie jak autoryzacja użytkowników i obsługa błędów.

```javascript
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
```

| Middleware               | Opis                                             |
| ------------------------ | ------------------------------------------------ |
| `errorHandlerMiddleware` | Globalny middleware do obsługi błędów            |
| `authenticateUser`       | Middleware do weryfikacji tokena JWT użytkownika |

### **5.4. Konfiguracja Middleware**

```javascript
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
```

| Middleware       | Opis                                             |
| ---------------- | ------------------------------------------------ |
| `morgan("dev")`  | Rejestruje zapytania HTTP w trybie deweloperskim |
| `cookieParser()` | Pozwala na obsługę ciasteczek                    |
| `express.json()` | Pozwala na przetwarzanie JSON w zapytaniach      |

### **5.5. Definiowanie Tras API**

### **Rejestracja Routerów**

Serwer przekazuje obsługę określonych ścieżek do odpowiednich routerów:

```javascript
app.use("/api/v1/desks", authenticateUser, deskRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
```

| Ścieżka         | Router       | Middleware         |
| --------------- | ------------ | ------------------ |
| `/api/v1/desks` | `deskRouter` | `authenticateUser` |
| `/api/v1/users` | `userRouter` | `authenticateUser` |
| `/api/v1/auth`  | `authRouter` | -                  |

Endpointy **`desks`**\*\* i \*\***`users`** wymagają uwierzytelnienia za pomocą `authenticateUser`, podczas gdy **`auth`** jest publiczny.

### **5.6. Globalna Obsługa Błędów**

Wszystkie błędy są obsługiwane centralnie przez `errorHandlerMiddleware`:

```javascript
app.use(errorHandlerMiddleware);
```

Dzięki temu unika się duplikacji kodu obsługi błędów w różnych częściach aplikacji.

### **5.7. Podłączenie do MongoDB i Uruchomienie Serwera**

Serwer łączy się z bazą MongoDB i nasłuchuje na określonym porcie:

```javascript
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
```

| Krok                 | Opis                                                    |
| -------------------- | ------------------------------------------------------- |
| Pobranie portu       | Serwer pobiera port z pliku `.env` lub domyślnie `5100` |
| Połączenie z MongoDB | `mongoose.connect(process.env.MONGO_URL)`               |
| Obsługa błędów       | Jeśli połączenie się nie powiedzie, serwer wyłącza się  |

### **5.8. Podsumowanie**

Plik `server.js`:

- Inicjalizuje serwer Express.
- Konfiguruje middleware (logowanie, ciasteczka, JSON).
- Definiuje ścieżki API i ich routery.
- Obsługuje autoryzację JWT dla zabezpieczonych endpointów.
- Podłącza aplikację do MongoDB.
- Zapewnia globalną obsługę błędów.


## **Podsumowanie**

DeskBooker to aplikacja do rezerwacji biurek z **Express.js + MongoDB** na backendzie oraz **React + Vite** na frontendzie. Obsługuje autoryzację JWT, zarządzanie użytkownikami i rezerwację biurek.

