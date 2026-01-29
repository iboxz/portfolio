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

$name = $_POST["name"];
$message = $_POST["message"];
$sql = "INSERT INTO chats (name, message, timestamp) VALUES ('$name', '$message', NOW())";

if ($conn->query($sql) === TRUE) {
    $timestamp = date("H:i");
    echo '<div class="message">';
    echo '<span class="name">' . htmlspecialchars($name) . '</span> ' . '<p class="chat-text">' . htmlentities($message, ENT_QUOTES, 'UTF-8') . '</span><br>';
    echo '<em>' . $timestamp . '</em>';
    echo '</div>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
