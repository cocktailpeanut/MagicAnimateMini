module.exports = async (kernel) => {
  let cmd = "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "pip install torch torchaudio torchvision"
    } else {
      cmd = "pip install torch==2.1.2 torchaudio==2.1.2"
    }
  } else {
    if (kernel.gpu === 'nvidia') {
      if (kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        cmd = "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        cmd = "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124"
      }
    } else if (kernel.gpu === 'amd') {
      cmd = "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2"
    } 
  }
  return {
    "run": [{
      "method": "shell.run",
      "params": {
        "venv": "env",
        "message": [
          "git clone https://github.com/peanutcocktail/magic-animate-for-windows app",
        ]
      }
    }, {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "build": true,
        "message": [
          cmd,
          "pip install nvidia-pyindex",
          "pip install -r requirements.txt",
        ]
      }
    }, {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "mkdir pretrained_models",
        ]
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app/pretrained_models",
        "message": [
          "git clone --depth=1 https://huggingface.co/zcxu-eric/MagicAnimate",
          "git clone --depth=1 https://huggingface.co/bdsqlsz/stable-diffusion-v1-5",
        ]
      }
    }, {
      "method": "input",
      "params": {
        "title": "Install Success",
        "description": "Go back to the dashboard and launch the app!"
      }
    }, {
      "method": "browser.open",
      "params": {
        "uri": "/?selected=MagicAnimate"
      }
    }]
  }
}
