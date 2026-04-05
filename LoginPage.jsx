import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  {
    title: 'Python Basics — Zero to Industry Level',
    content: (<>
      <h3>What is Python?</h3>
      <p>Python is a high-level, interpreted, dynamically typed language famous for its clean, readable syntax. Used for web development (Django/Flask/FastAPI), data science, AI/ML, automation, scripting, and DevOps.</p>

      <h3>Why Python?</h3>
      <ul>
        <li>Beginner-friendly — reads almost like English</li>
        <li>Huge standard library — "batteries included"</li>
        <li>Top language for AI/ML (TensorFlow, PyTorch, scikit-learn)</li>
        <li>Great for automation and scripting</li>
        <li>Used by Google, Instagram, Spotify, Netflix, NASA</li>
      </ul>

      <h3>Install & Run</h3>
      <pre>{`# Download Python 3.12+ from python.org

python --version         # check version
python3 --version        # on Mac/Linux

python app.py            # run a script
python3 app.py           # on Mac/Linux
python -m venv venv      # create virtual environment
source venv/bin/activate # activate (Mac/Linux)
venv\\Scripts\\activate   # activate (Windows)
pip install requests     # install package
pip freeze > requirements.txt  # save dependencies`}</pre>

      <h3>Variables & Types</h3>
      <pre>{`# Python infers type automatically
name   = "Alice"          # str
age    = 25               # int
height = 5.7              # float
active = True             # bool (capital T/F!)
data   = None             # None (like null/undefined)

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# Type checking
type(name)               # <class 'str'>
isinstance(age, int)     # True
isinstance(age, (int, float))  # True for either

# Type conversion
str(42)        # "42"
int("42")      # 42
int(3.9)       # 3 (truncates, doesn't round!)
float("3.14")  # 3.14
bool(0)        # False
bool("")       # False
bool([])       # False (empty container = falsy)
bool("hi")     # True
list("hello")  # ['h','e','l','l','o']`}</pre>

      <h3>Strings — Every Method</h3>
      <pre>{`name = "  Hello, World!  "

# Basic
len(name)                  # 18
name.upper()               # "  HELLO, WORLD!  "
name.lower()               # "  hello, world!  "
name.title()               # "  Hello, World!  "
name.strip()               # "Hello, World!" (remove whitespace)
name.lstrip()              # remove left whitespace
name.rstrip()              # remove right whitespace

# Search
name.find("World")         # 9  (-1 if not found)
name.index("World")        # 9  (raises ValueError if not found)
name.count("l")            # 3
"World" in name            # True
name.startswith("  Hello") # True
name.endswith("!  ")       # True

# Modify
name.replace("World", "Python")  # "  Hello, Python!  "
name.strip().replace(",", "")    # chain methods!

# Split & Join
"a,b,c".split(",")         # ["a","b","c"]
"hello".split("")           # ['h','e','l','l','o']
" ".join(["Hello", "World"])# "Hello World"
",".join(["a","b","c"])     # "a,b,c"

# Slicing
s = "Hello, World!"
s[0]        # 'H'
s[-1]       # '!'  (last character)
s[7:12]     # 'World'
s[:5]       # 'Hello'
s[7:]       # 'World!'
s[::2]      # 'Hlo ol!'  (every 2nd char)
s[::-1]     # '!dlroW ,olleH'  (reversed!)

# Check
"42".isdigit()     # True
"hello".isalpha()  # True
"  ".isspace()     # True

# f-strings (use ALWAYS)
name, age = "Alice", 25
f"My name is {name} and I'm {age} years old"
f"2 + 2 = {2 + 2}"
f"{name.upper()}"
f"{3.14159:.2f}"      # "3.14" (2 decimal places)
f"{1000000:,}"        # "1,000,000" (thousands separator)
f"{age:>10}"          # right-align in 10 chars`}</pre>

      <h3>Numbers & Math</h3>
      <pre>{`# Operators
10 + 3   # 13   addition
10 - 3   # 7    subtraction
10 * 3   # 30   multiplication
10 / 3   # 3.333... (always float in Python 3!)
10 // 3  # 3    floor division (integer result)
10 % 3   # 1    modulo (remainder)
2 ** 10  # 1024 exponent
-(-5)    # 5    unary minus
abs(-7)  # 7    absolute value

# Augmented assignment
x += 10
x -= 5
x *= 2
x //= 3
x **= 2

# Math module
import math

math.sqrt(16)      # 4.0
math.floor(4.9)    # 4  (round down)
math.ceil(4.1)     # 5  (round up)
math.round(4.5)    # 4  (banker's rounding!)
round(4.6)         # 5  (built-in round)
math.pow(2, 10)    # 1024.0
math.log(100, 10)  # 2.0  (log base 10)
math.pi            # 3.14159...
math.e             # 2.71828...
math.inf           # infinity
math.factorial(5)  # 120
math.gcd(12, 8)    # 4

# Random
import random
random.random()           # 0.0 to 0.999...
random.randint(1, 6)      # random integer 1-6 (dice)
random.uniform(1.0, 10.0) # random float
random.choice([1,2,3])    # random item
random.sample([1,2,3,4,5], 3) # 3 unique random items
random.shuffle(my_list)   # shuffle in-place (modifies list!)`}</pre>

      <h3>Lists — Complete Reference</h3>
      <pre>{`fruits = ["apple", "banana", "cherry", "date"]

# Access
fruits[0]         # "apple"
fruits[-1]        # "date"  (last)
fruits[1:3]       # ["banana","cherry"]  (slicing)
fruits[:2]        # ["apple","banana"]
fruits[::2]       # ["apple","cherry"]  (every 2nd)
fruits[::-1]      # reversed list

# Modify
fruits.append("elderberry")       # add to end
fruits.insert(1, "avocado")       # insert at index 1
fruits.extend(["fig", "grape"])   # add multiple items
fruits.remove("banana")           # remove by value (first occurrence)
fruits.pop()                      # remove & return last
fruits.pop(0)                     # remove & return at index
del fruits[2]                     # delete at index
fruits.clear()                    # empty the list

# Search
"apple" in fruits        # True
fruits.index("cherry")   # 2  (raises ValueError if not found)
fruits.count("apple")    # number of occurrences
len(fruits)              # length

# Sort & Order
fruits.sort()                     # sort in-place A-Z
fruits.sort(reverse=True)         # Z-A
fruits.sort(key=len)              # sort by length
sorted(fruits)                    # returns NEW sorted list (original unchanged)
fruits.reverse()                  # reverse in-place

# Copy
copy1 = fruits[:]                 # slice copy
copy2 = fruits.copy()             # .copy() method
copy3 = list(fruits)              # list() constructor
import copy
deep  = copy.deepcopy(fruits)     # deep copy (for nested lists)

# List comprehension (Python's superpower!)
squares = [x**2 for x in range(1, 11)]          # [1,4,9,...,100]
evens   = [x for x in range(20) if x % 2 == 0]  # [0,2,4,...,18]
upper   = [s.upper() for s in fruits]
matrix  = [[i*j for j in range(1,4)] for i in range(1,4)]  # nested

# Useful functions
sum([1,2,3,4,5])     # 15
min([3,1,4,1,5])     # 1
max([3,1,4,1,5])     # 5
list(range(5))       # [0,1,2,3,4]
list(range(1,6))     # [1,2,3,4,5]
list(enumerate(fruits))    # [(0,'apple'),(1,'banana'),...]
list(zip([1,2,3], ['a','b','c']))  # [(1,'a'),(2,'b'),(3,'c')]`}</pre>

      <h3>Dictionaries — Complete Reference</h3>
      <pre>{`user = {
  "name":    "Alice",
  "age":     25,
  "email":   "alice@example.com",
  "skills":  ["Python", "JavaScript"],
  "address": {"city": "Mumbai", "pin": "400001"}
}

# Access
user["name"]                     # "Alice"
user.get("phone")                # None  (no error if missing)
user.get("phone", "N/A")         # "N/A"  (default value)
user["address"]["city"]          # "Mumbai"  (nested)
user.get("address", {}).get("city")  # safe nested access

# Modify
user["age"] = 26                 # update
user["role"] = "admin"           # add new key
del user["email"]                # delete key
user.pop("email", None)          # delete + return (safe)
user.setdefault("score", 0)      # add only if doesn't exist

# Check
"name" in user                   # True
"phone" not in user              # True

# Loop
for key in user:                 # loop over keys
    print(key)
for key, value in user.items():  # loop over key-value pairs
    print(f"{key}: {value}")
for value in user.values():      # loop over values
    print(value)

# Methods
user.keys()                      # dict_keys([...])
user.values()                    # dict_values([...])
user.items()                     # dict_items([...])
user.update({"age": 27, "role": "admin"})  # merge/update
user.copy()                      # shallow copy
user.clear()                     # empty dict

# Dict comprehension
squares = {n: n**2 for n in range(1, 6)}        # {1:1, 2:4, ...}
filtered = {k: v for k, v in user.items() if k != "password"}

# Merge dicts (Python 3.9+)
merged = dict1 | dict2
merged = {**dict1, **dict2}      # older syntax`}</pre>
    </>),
  },

  {
    title: 'Functions, OOP & Control Flow',
    content: (<>
      <h3>Conditionals & Loops</h3>
      <pre>{`# if / elif / else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Ternary (one-liner)
grade = "Pass" if score >= 50 else "Fail"
label = "even" if n % 2 == 0 else "odd"

# Truthiness
# Falsy: 0, 0.0, "", [], {}, set(), None, False
# Truthy: everything else
if user:                   # check not None/empty
    print(user["name"])

# Walrus operator := (Python 3.8+)
if (n := len(data)) > 10:
    print(f"Too long: {n} items")

# Match statement (Python 3.10+ — like switch)
match status:
    case "pending":  print("Waiting...")
    case "active":   print("Active!")
    case "done":     print("Finished!")
    case _:          print("Unknown")  # default`}</pre>

      <h3>Loops — Complete Guide</h3>
      <pre>{`# for loop
for i in range(5):         # 0,1,2,3,4
    print(i)

for i in range(1, 6):      # 1,2,3,4,5
    print(i)

for i in range(0, 10, 2):  # 0,2,4,6,8  (step=2)
    print(i)

for i in range(10, 0, -1): # countdown 10..1

# Iterate over collections
for fruit in ["apple","banana","cherry"]:
    print(fruit)

for char in "Hello":       # iterate over string
    print(char)

# with index — use enumerate
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

for i, fruit in enumerate(fruits, start=1):  # start from 1
    print(f"{i}: {fruit}")

# over dict
for key, val in user.items():
    print(f"{key} = {val}")

# zip — iterate multiple lists together
names   = ["Alice", "Bob", "Carol"]
scores  = [90, 85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# while loop
count = 0
while count < 5:
    print(count)
    count += 1

# while True (infinite loop with break)
while True:
    answer = input("Continue? (y/n): ")
    if answer == 'n':
        break

# Loop control
for n in range(10):
    if n == 3: continue    # skip to next iteration
    if n == 7: break       # exit loop entirely
    print(n)

# else clause on loops (runs if loop completed without break)
for n in range(10):
    if n == 5:
        print("Found 5!")
        break
else:
    print("5 not found")   # only runs if no break`}</pre>

      <h3>Functions — Complete Reference</h3>
      <pre>{`# Basic function
def greet(name):
    """Docstring: describe what function does."""
    return f"Hello, {name}!"

# Default parameters
def create_user(name, age=18, role="user", active=True):
    return {"name": name, "age": age, "role": role, "active": active}

create_user("Alice")                   # uses all defaults
create_user("Bob", age=25, role="admin")  # keyword arguments

# *args — variable positional arguments
def total(*numbers):
    return sum(numbers)

total(1, 2, 3)      # 6
total(1, 2, 3, 4, 5) # 15

# **kwargs — variable keyword arguments
def create_card(**kwargs):
    return kwargs

create_card(title="Hello", color="blue", size=12)

# Combining all parameter types
def full_example(required, /, positional, *, keyword_only, **extras):
    pass

# Lambda — anonymous one-liner function
square  = lambda n: n ** 2
add     = lambda a, b: a + b
is_even = lambda n: n % 2 == 0

# Higher-order functions
numbers = [1, 2, 3, 4, 5, 6]
evens   = list(filter(lambda n: n%2==0, numbers))   # [2,4,6]
squared = list(map(lambda n: n**2, numbers))         # [1,4,9,16,25,36]

from functools import reduce
total   = reduce(lambda acc, n: acc + n, numbers, 0)  # 21

# Sorting with key
users = [{"name": "Bob", "age": 30}, {"name": "Alice", "age": 25}]
users.sort(key=lambda u: u["age"])         # sort by age
users.sort(key=lambda u: u["name"])        # sort by name
users.sort(key=lambda u: (-u["age"], u["name"]))  # multi-key`}</pre>

      <h3>Error Handling</h3>
      <pre>{`# try / except / else / finally
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except (ValueError, TypeError) as e:
    print(f"Type/Value error: {e}")
except Exception as e:
    print(f"Unexpected error: {type(e).__name__}: {e}")
else:
    print("No error occurred!")     # runs only if no exception
finally:
    print("Always runs — good for cleanup")

# Common exception types
ZeroDivisionError  — divide by zero
ValueError         — wrong value type (int("hello"))
TypeError          — wrong type for operation
KeyError           — dict key not found
IndexError         — list index out of range
FileNotFoundError  — file doesn't exist
AttributeError     — attribute doesn't exist
NameError          — variable not defined
ImportError        — module not found
StopIteration      — iterator exhausted
RecursionError     — too deep recursion
PermissionError    — no file permission

# Raise exceptions
def divide(a, b):
    if b == 0:
        raise ValueError("Divisor cannot be zero")
    if not isinstance(b, (int, float)):
        raise TypeError(f"Expected number, got {type(b).__name__}")
    return a / b

# Custom exception
class DevLearnError(Exception):
    """Base exception for DevLearn app."""
    pass

class AuthError(DevLearnError):
    def __init__(self, message, status_code=401):
        super().__init__(message)
        self.status_code = status_code

raise AuthError("Invalid OTP", 401)

# Context managers (with statement)
with open("file.txt", "r") as f:
    content = f.read()
# file automatically closed after block`}</pre>

      <h3>Object-Oriented Programming</h3>
      <pre>{`class BankAccount:
    # Class variable (shared by all instances)
    bank_name = "DevBank"
    _total_accounts = 0

    def __init__(self, owner, balance=0):
        # Instance variables
        self.owner   = owner
        self._balance = balance     # _ = protected by convention
        self.__id    = id(self)     # __ = name-mangled (private)
        BankAccount._total_accounts += 1

    # String representation
    def __str__(self):
        return f"Account({self.owner}, ₹{self._balance:,})"

    def __repr__(self):
        return f"BankAccount('{self.owner}', {self._balance})"

    # Operator overloading
    def __eq__(self, other):
        return self._balance == other._balance

    def __lt__(self, other):
        return self._balance < other._balance

    # Property — getter
    @property
    def balance(self):
        return self._balance

    # Property — setter
    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = amount

    # Instance methods
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        return self  # enable method chaining

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        return self

    # Class method
    @classmethod
    def get_total_accounts(cls):
        return cls._total_accounts

    # Static method (no self or cls)
    @staticmethod
    def is_valid_amount(amount):
        return isinstance(amount, (int, float)) and amount > 0


# Inheritance
class SavingsAccount(BankAccount):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)  # call parent __init__
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self._balance * self.interest_rate
        self._balance += interest
        print(f"Added ₹{interest:.2f} interest")
        return self

    # Method override
    def withdraw(self, amount):
        if amount > self._balance * 0.9:  # max 90% withdrawal
            raise ValueError("Cannot withdraw more than 90% from savings")
        return super().withdraw(amount)  # call parent method


# Usage
acc = BankAccount("Alice", 1000)
acc.deposit(500).withdraw(200)   # method chaining
print(acc)                        # BankAccount(Alice, ₹1300)
print(acc.balance)                # 1300 (property)
acc.balance = 2000                # setter

savings = SavingsAccount("Bob", 5000, 0.08)
savings.add_interest()            # adds 8%
print(isinstance(savings, BankAccount))  # True
print(BankAccount.get_total_accounts())  # 2`}</pre>
    </>),
  },

  {
    title: 'Advanced Python & Libraries',
    content: (<>
      <h3>Comprehensions & Generators</h3>
      <pre>{`# List comprehension
squares  = [x**2 for x in range(1, 11)]
evens    = [x for x in range(20) if x%2==0]
pairs    = [(x,y) for x in range(3) for y in range(3)]

# Dict comprehension
sq_dict  = {n: n**2 for n in range(1, 6)}     # {1:1, 2:4,...}
inverted = {v: k for k, v in original.items()} # swap keys/values

# Set comprehension
unique   = {x%5 for x in range(20)}   # {0,1,2,3,4}

# Generator expression (lazy — efficient for large data)
gen_sq   = (x**2 for x in range(1000000))  # NO memory allocation!
total    = sum(x**2 for x in range(1000000))  # compute on-the-fly

# Generator function
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(10)])  # [0,1,1,2,3,5,8,13,21,34]

# File processing with generator (memory efficient)
def read_large_file(path):
    with open(path) as f:
        for line in f:
            yield line.strip()

for line in read_large_file("bigfile.txt"):
    process(line)`}</pre>

      <h3>Decorators</h3>
      <pre>{`import time
import functools

# Basic decorator
def timer(func):
    @functools.wraps(func)  # preserves original function metadata
    def wrapper(*args, **kwargs):
        start  = time.perf_counter()
        result = func(*args, **kwargs)
        end    = time.perf_counter()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

def retry(max_attempts=3, delay=1):
    """Decorator factory — takes arguments"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt+1} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

def cache(func):
    """Simple memoization"""
    memo = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
        return memo[args]
    return wrapper

# Usage
@timer
def slow_function():
    time.sleep(0.5)
    return "done"

@retry(max_attempts=3, delay=2)
def unreliable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Success"

@cache
def fibonacci(n):
    if n < 2: return n
    return fibonacci(n-1) + fibonacci(n-2)

# functools.lru_cache — built-in memoization
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive(n):
    return sum(range(n))`}</pre>

      <h3>File & System Operations</h3>
      <pre>{`from pathlib import Path
import json, csv, os, shutil

# pathlib — modern file paths
p = Path("data/users.json")
p.exists()                         # True/False
p.is_file()                        # True
p.is_dir()                         # False
p.parent                           # Path("data")
p.name                             # "users.json"
p.stem                             # "users"
p.suffix                           # ".json"
p.read_text()                      # read file as string
p.read_bytes()                     # read as bytes
p.write_text("content")            # write string
p.mkdir(parents=True, exist_ok=True)  # create dir
p.unlink()                         # delete file
p.rename("new_name.json")          # rename
list(Path(".").glob("*.py"))       # find all .py files
list(Path(".").rglob("*.py"))      # recursive search

# JSON
with open("data.json", "w") as f:
    json.dump({"name":"Alice","age":25}, f, indent=2, ensure_ascii=False)

with open("data.json", "r") as f:
    data = json.load(f)

# String ↔ JSON
json_str = json.dumps(data, indent=2)
data     = json.loads(json_str)

# CSV
import csv
with open("users.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name","age","email"])
    writer.writeheader()
    writer.writerow({"name":"Alice","age":25,"email":"alice@example.com"})

with open("users.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"])   # access by column name

# os operations
os.getcwd()                        # current directory
os.listdir(".")                    # list files/folders
os.path.exists("file.txt")         # check existence
os.environ.get("HOME", "")         # environment variable
os.getenv("DATABASE_URL")          # shorter form

# shutil — high-level file operations
shutil.copy("source.txt", "dest.txt")
shutil.copytree("src_dir", "dest_dir")
shutil.move("old.txt", "new.txt")
shutil.rmtree("dir_to_delete")`}</pre>

      <h3>Popular Libraries</h3>
      <pre>{`# ── requests — HTTP calls ──────────────────────────────
import requests

res = requests.get("https://jsonplaceholder.typicode.com/users",
    params={"_limit": 5},       # query params
    headers={"Authorization": "Bearer token"},
    timeout=10)

res.status_code    # 200
res.json()         # parse JSON response
res.text           # raw text
res.headers        # response headers
res.raise_for_status()  # raise exception if 4xx/5xx

# POST
res = requests.post("https://api.example.com/users",
    json={"name": "Alice"},
    headers={"Content-Type": "application/json"})

# Session (reuse connection, headers, cookies)
with requests.Session() as s:
    s.headers.update({"Authorization": "Bearer token"})
    users = s.get("/api/users").json()
    posts = s.get("/api/posts").json()

# ── Flask — Web Framework ────────────────────────────
from flask import Flask, jsonify, request, abort
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Flask!"

@app.route("/api/users", methods=["GET"])
def get_users():
    users = [{"id":1,"name":"Alice"}, {"id":2,"name":"Bob"}]
    return jsonify(users)

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = {"id": user_id, "name": "Alice"}
    if not user:
        abort(404, description="User not found")
    return jsonify(user)

@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "name is required"}), 400
    new_user = {"id": 3, **data}
    return jsonify(new_user), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)

# ── pandas — Data Analysis ───────────────────────────
import pandas as pd

df = pd.read_csv("data.csv")
df.head(5)            # first 5 rows
df.tail(5)            # last 5 rows
df.info()             # column names and types
df.describe()         # statistics (mean, std, min, max)
df.shape              # (rows, columns)
df.columns            # column names
df.dtypes             # data types

# Select
df["name"]            # single column (Series)
df[["name","age"]]    # multiple columns (DataFrame)
df.iloc[0]            # first row by index
df.loc[df["age"] > 25] # filter rows

# Modify
df["age"] = df["age"] + 1          # update column
df["senior"] = df["age"] > 60      # create new column
df.drop("email", axis=1)           # drop column
df.dropna()                        # drop rows with NaN
df.fillna(0)                       # fill NaN with 0

# Aggregate
df["age"].mean()      # average
df["age"].sum()       # sum
df.groupby("role")["age"].mean()   # group by role

df.to_csv("output.csv", index=False)
df.to_json("output.json", orient="records")`}</pre>

      <h3>Async Python</h3>
      <pre>{`import asyncio
import aiohttp  # pip install aiohttp

# async function
async def fetch_user(session, user_id):
    async with session.get(f"https://api.example.com/users/{user_id}") as res:
        return await res.json()

# Run multiple requests concurrently
async def fetch_all():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_user(session, i) for i in range(1, 11)]
        users = await asyncio.gather(*tasks)  # runs ALL concurrently!
        return users

# Run the async code
users = asyncio.run(fetch_all())

# vs sequential (10x slower for 10 requests)
# for i in range(1, 11):
#     user = requests.get(f".../{i}").json()  # waits for each`}</pre>

      <h3>Testing with pytest</h3>
      <pre>{`pip install pytest pytest-cov

# test_math.py
import pytest
from myapp.math import add, divide, fibonacci

def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_divide_normal():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    with pytest.raises(ValueError, match="zero"):
        divide(10, 0)

@pytest.mark.parametrize("n,expected", [
    (0, 0), (1, 1), (2, 1), (5, 5), (10, 55)
])
def test_fibonacci(n, expected):
    assert fibonacci(n) == expected

@pytest.fixture
def sample_user():
    return {"name": "Alice", "age": 25, "email": "alice@example.com"}

def test_user_creation(sample_user):
    from myapp.users import create_user
    user = create_user(**sample_user)
    assert user["name"] == "Alice"
    assert "id" in user

# Run tests
# pytest                    # run all tests
# pytest -v                 # verbose output
# pytest --cov=myapp        # with coverage report
# pytest -k "test_add"      # run specific tests`}</pre>

      <h3>Python Best Practices</h3>
      <pre>{`# PEP 8 — Python Style Guide
✓ 4 spaces for indentation (NEVER tabs)
✓ snake_case for variables and functions
✓ PascalCase for classes
✓ UPPER_CASE for constants
✓ Max 79 characters per line
✓ Two blank lines between top-level functions/classes
✓ One blank line between methods in a class
✓ Imports at top: stdlib, third-party, local (with blank lines between)

# Type hints (Python 3.5+)
def greet(name: str, age: int = 18) -> str:
    return f"Hello, {name}! You are {age}."

def process_users(users: list[dict]) -> list[str]:
    return [u["name"] for u in users]

from typing import Optional, Union, Any
def find_user(id: int) -> Optional[dict]:
    pass  # returns dict or None

# Dataclasses — cleaner than plain dicts for structured data
from dataclasses import dataclass, field

@dataclass
class User:
    name:  str
    email: str
    age:   int = 18
    tags:  list = field(default_factory=list)

    def is_adult(self) -> bool:
        return self.age >= 18

user = User("Alice", "alice@example.com", 25, ["python", "react"])
print(user.name)           # Alice
print(user.is_adult())     # True

# Virtual environments (ALWAYS use them)
python -m venv venv               # create
source venv/bin/activate          # activate (Mac/Linux)
venv\\Scripts\\activate           # activate (Windows)
pip install -r requirements.txt   # install deps
pip freeze > requirements.txt     # save deps
deactivate                        # exit venv`}</pre>
    </>),
  },
]

export default function PythonModule() {
  const { progress, updateProgress } = useAuth()
  const [open, setOpen] = useState(null)
  const sections = progress.pythonSections || [false, false, false]
  const pct = progress.python || 0

  return (
    <>
      <Navbar />
      <div className="module-page">
        <p className="breadcrumb"><Link to="/dashboard">Dashboard</Link> › Python</p>
        <h1 className="module-title">🐍 Python Basics</h1>
        <p className="module-desc">Learn one of the world's most versatile languages — from fundamentals to web frameworks, data science, and testing.</p>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <ProgressBar value={pct} color="#4a9eff" />
        </div>
        <div className="section-list">
          {SECTIONS.map((s, i) => {
            const done = sections[i]; const isOpen = open === i
            return (
              <div className="section-item" key={i}>
                <div className="section-header" onClick={() => setOpen(isOpen ? null : i)}>
                  <div className="section-title-row">
                    <div className="section-num" style={{ background: done ? '#4a9eff' : 'var(--bg3)', color: done ? '#fff' : 'var(--muted)' }}>{done ? '✓' : i + 1}</div>
                    <span className="section-title">{s.title}</span>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div className="section-body">
                    {s.content}
                    {!done ? (
                      <button className="btn complete-btn" style={{ background: '#0a1f3a', color: '#a8d4ff', border: '1px solid #4a9eff' }} onClick={() => updateProgress('python', i)}>✓ Mark as Complete</button>
                    ) : <p className="success-msg" style={{ marginTop: '1rem' }}>✓ Section completed!</p>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: '1.5rem' }}><Link to="/dashboard" className="btn btn-secondary">← Back</Link></div>
      </div>
    </>
  )
}
