<?php
//  Settings 
$uploadDir = __DIR__ . '/uploads2/';

$limits = [
    'image' => 8 * 1024 * 1024,
    'gif'   => 8 * 1024 * 1024,
    'video' => 40 * 1024 * 1024,
    'audio' => 20 * 1024 * 1024,
    'file'  => 50 * 1024 * 1024
];

$maxFiles = 20;

// Category Mapping
function getCategory(string $mime): string
{
    $map = [
        'image/jpeg' => 'image',
        'image/png'  => 'image',
        'image/gif'  => 'gif',
        'image/webp' => 'image',
        'video/mp4'  => 'video',
        'video/webm' => 'video',
        'video/ogg'  => 'video',
        'audio/mpeg' => 'audio',
        'audio/wav'  => 'audio',
        'audio/ogg'  => 'audio',
        'audio/aac'  => 'audio',
        'audio/flac' => 'audio',
        'audio/mp4'  => 'audio',
    ];
    return $map[$mime] ?? 'file';
}

// Process Upload (POST)
 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['media'])) {
    $file = $_FILES['media'];
    $msg  = '';

    if ($file['error'] !== UPLOAD_ERR_OK) {
        $msg = 'Upload error.';
    } else {
        $mime = mime_content_type($file['tmp_name']);
        $cat  = getCategory($mime);

        if (!isset($limits[$cat]) || $file['size'] > $limits[$cat]) {
            $msg = 'Unsupported or oversized file.';
        } else {
            // Delete oldest files
            $all = array_filter(scandir($uploadDir), fn($f) => is_file($uploadDir . $f));
            while (count($all) >= $maxFiles) {
                $oldest = array_reduce($all, function ($old, $f) use ($uploadDir) {
                    $time = filemtime($uploadDir . $f);
                    return ($old === null || $time < $old['time']) ? ['file' => $f, 'time' => $time] : $old;
                });
                @unlink($uploadDir . $oldest['file']);
                $all = array_filter(scandir($uploadDir), fn($f) => is_file($uploadDir . $f));
            }

            // Determine next suffix
            $maxSuffix = 0;
            foreach ($all as $existing) {
                if (preg_match('/_(\d+)\./', $existing, $m)) {
                    $maxSuffix = max($maxSuffix, (int)$m[1]);
                }
            }
            $nextNum = $maxSuffix + 1;

            // Build filename
            $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
            $ext          = pathinfo($file['name'], PATHINFO_EXTENSION);
            $newName      = $originalName . '_' . $nextNum . '.' . $ext;
            $dest         = $uploadDir . $newName;

            if (move_uploaded_file($file['tmp_name'], $dest)) {
                $msg = ucfirst($cat) . ' uploaded successfully.';
            } else {
                $msg = 'Failed to save the file.';
            }
        }
    }

    session_start();
    $_SESSION['msg'] = $msg;
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// Display Messages
session_start();
$msg = $_SESSION['msg'] ?? '';
unset($_SESSION['msg']);

// Delete Old Files
$allFiles = array_filter(scandir($uploadDir), fn($f) => is_file($uploadDir . $f));
if (count($allFiles) > $maxFiles) {
    usort($allFiles, function ($a, $b) {
        preg_match('/_(\d+)\./', $a, $ma);
        preg_match('/_(\d+)\./', $b, $mb);
        $na = $ma[1] ?? 0;
        $nb = $mb[1] ?? 0;
        return $na <=> $nb;
    });
    while (count($allFiles) > $maxFiles) {
        $old = array_shift($allFiles);
        @unlink($uploadDir . $old);
    }
}

function getOrderedFilesDesc(string $dir): array
{
    $files = array_filter(scandir($dir), fn($f) => is_file($dir . $f));
    usort($files, function ($a, $b) {
        preg_match('/_(\d+)\./', $a, $ma);
        preg_match('/_(\d+)\./', $b, $mb);
        $na = $ma[1] ?? 0;
        $nb = $mb[1] ?? 0;
        return $nb <=> $na;
    });
    return $files;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Universal Media Gallery</title>
    <link rel="stylesheet" href="imgProj\img.css?v=2" />
</head>

<body>
    <div class="container">
        <h1>Upload Media (Image 8 MB, Video 40 MB, Audio 20 MB, Other 50 MB)</h1>

        <?php if ($msg): ?>
            <div class="msg <?= strpos($msg, 'error') !== false ? 'error' : '' ?>">
                <?= htmlspecialchars($msg) ?>
            </div>
        <?php endif; ?>

        <form action="" method="post" enctype="multipart/form-data" onsubmit="return onUploadFile();">
            <input type="file" name="media" id="file" required>
            <input type="submit" value="Upload">
            <span style="color:#bbb; margin-left: 10px;"></span>
        </form>
        <div class="holder">
            <h2>Gallery (<span id="count"></span> items)</h2>
            <button id="refreshBtn" type="button">Refresh</button>
        </div>
        <div id="gallery">
            <?php
            $ordered = getOrderedFilesDesc($uploadDir);
            foreach ($ordered as $file):
                $path = 'uploads2/' . $file;
                $full = $uploadDir . $file;
                $mime = mime_content_type($full);
                $ext  = strtolower(pathinfo($file, PATHINFO_EXTENSION));

                if (preg_match('#^image/(jpeg|png|gif|webp)$#', $mime)):
                    $preview = "<img src=\"$path\" alt=\"image\">";
                elseif (preg_match('#^video/#', $mime)):
                    $preview = "<video src=\"$path\" controls></video>";
                elseif (preg_match('#^audio/#', $mime) || in_array($ext, ['mp3','wav','ogg','aac','flac','m4a'])):
                    $preview = "<audio src=\"$path\" controls style=\"width:100%;margin-top:4px;height: 65px;\"></audio>";
                else:
                $preview = <<<HTML
                    <svg class="icon" viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="80" rx="8" ry="8" fill="#e0e0e0"/><path d="M16 0h24l16 16v48a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" fill="#b0b0b0"/><text x="32" y="55" font-size="28" text-anchor="middle" fill="#555">📄</text></svg>
                HTML;
                endif;
            ?>
            <div class="item">
                <a href="<?= $path ?>" target="_blank">
                    <?= $preview ?>
                </a>
                <div class="filename"><?= htmlspecialchars($file) ?></div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
        function onUploadFile() {
            const limits = {
                image: 8,
                gif: 8,
                video: 40,
                audio: 20,
                file: 50
            };

            const fileInput = document.getElementById('file');
            const file = fileInput.files[0];
            const status = fileInput.parentElement.getElementsByTagName('span')[0];

            if (!file) {
                status.innerText = 'No file selected.';
                return false;
            }

            const sizeMB = file.size / (1024 * 1024);
            const type = file.type;

            let cat = null;
            if (type.startsWith('image/')) {
                cat = (type === 'image/gif') ? 'gif' : 'image';
            } else if (type.startsWith('video/')) {
                cat = 'video';
            } else if (type.startsWith('audio/')) {
                cat = 'audio';
            } else {
                cat = 'file';
            }

            if (sizeMB > limits[cat]) {
                status.innerText = `File size exceeds the ${limits[cat]} MB limit for ${cat}s.`;
                return false;
            }

            status.innerText = 'File is valid.';
            return true;
        }

        function loadGallery() {
            fetch(window.location.href, {
                cache: 'no-store'
            })
            .then(r => r.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newGallery = doc.getElementById('gallery').innerHTML;
                document.getElementById('gallery').innerHTML = newGallery;

                const items = document.querySelectorAll('#gallery .item');
                document.getElementById('count').textContent = items.length;
            })
            .catch(console.error);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('#gallery .item');
            document.getElementById('count').textContent = items.length;
            document.getElementById('refreshBtn').addEventListener('click', loadGallery);
        });
    </script>
</body>

</html>
