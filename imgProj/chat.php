php
<?php
$host = 'localhost';
$username = 'mhmwfcpw_imgChatSection';
$password = 'S&$olscDRlT.e9?b';
$dbname = 'mhmwfcpw_imgChatSection';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function deleteOldChats($conn) {
    $cutoff = date('Y-m-d H:i:s', time() - 6 * 3600); // 6 hours ago
    $sql = "DELETE FROM chats WHERE timestamp < '$cutoff'";
    $conn->query($sql);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    setcookie("username", $name, time() + (86400 * 30), "/"); // 30 روز اعتبار
}

if (isset($_COOKIE["username"])) {
    $name = $_COOKIE["username"];
} else {
    $name = "";
}

deleteOldChats($conn);

$sql = "SELECT name, message, timestamp FROM chats ORDER BY timestamp ASC";
$result = $conn->query($sql);
$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Chat Box</title>
</head>
<body>

    <div class="chatSection">
    <div class="chat-container" id="chat-container"></div>

    <form id="chatForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($name); ?>" <?php if (isset($_COOKIE["username"])) echo "readonly"; ?>>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" cols="50" maxlength="1000" required></textarea><br><br>
        <button type="submit">Send</button>
    </form>
    </div>
  <script>

      document.getElementById("chatForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch("chat_submit.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            document.getElementById("message").value = "";

            const chatContainer = document.getElementById("chat-container");
            chatContainer.innerHTML += data;
            chatContainer.scrollTop = chatContainer.scrollHeight;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    </script>
    </body>
</html>