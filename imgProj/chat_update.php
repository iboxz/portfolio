
<?php
$host = 'localhost';
$username = 'mhmwfcpw_imgChatSection';
$password = 'S&$olscDRlT.e9?b';
$dbname = 'mhmwfcpw_imgChatSection';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

// دریافت last_timestamp از کلاینت
$lastTimestamp = isset($_POST['last_timestamp']) ? $_POST['last_timestamp'] : null;

$output = "";

// اگر lastTimestamp داشته باشیم، فقط پیام‌های بعد از آن زمان را برمی‌گردانیم
if ($lastTimestamp) {
    $sql = "SELECT name, message, timestamp FROM chats WHERE timestamp > ? ORDER BY timestamp ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $lastTimestamp);
    $stmt->execute();
    $result = $stmt->get_result();

} else {
    // اولین بار: تمام پیام‌ها (این بخش فقط برای اولین بار است)
    $sql = "SELECT name, message, timestamp FROM chats ORDER BY timestamp ASC";
    $result = $conn->query($sql);
}

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $output .= '<div class="message">';
        $output .= '<span class="name">' . htmlspecialchars($row["name"]) . '</span> ' . '<p class="chat-text">' . htmlentities($row['message'], ENT_QUOTES, 'UTF-8') . '</span><br>';
        $output .= '<em>' . date("H:i", strtotime($row["timestamp"])) . '</em>';
        $output .= '</div>';
    }
}

$conn->close();
echo $output;
?>