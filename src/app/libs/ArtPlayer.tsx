"use client";
import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";
import useRootContext from "../hooks/useRootContext";

interface ArtPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  option: Omit<Artplayer["option"], "container">;
  getInstance?: (instance: Artplayer) => void;
}

interface Level {
  height: number;
  name: string;
}

function playM3u8(video: HTMLVideoElement, url: string, art: Artplayer) {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;
    art.on("destroy", () => hls.destroy());
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  } else {
    art.notice.show = "Unsupported playback format: m3u8";
  }
}

const isAndroid = /Android/i.test(navigator.userAgent);

export default function ArtPlayer({
  option,
  getInstance,
  ...rest
}: ArtPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<Artplayer>(null);
  const { isSearchFocus } = useRootContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const art = new Artplayer({
      ...option,
      container,
      type: "m3u8",
      controls: [
        {
          index: 1,
          position: "right",
          tooltip: "-10 giây",
          html: `<button type="button" class="text-white hidden md:block">
              <svg
                width="26"
                height="24"
                viewBox="0 0 26 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4401 2C10.8764 2.00731 8.41355 2.99891 6.56006 4.77V3C6.56006 2.73478 6.4547 2.48043 6.26717 2.29289C6.07963 2.10536 5.82528 2 5.56006 2C5.29484 2 5.04049 2.10536 4.85295 2.29289C4.66542 2.48043 4.56006 2.73478 4.56006 3V7.5C4.56006 7.76522 4.66542 8.01957 4.85295 8.20711C5.04049 8.39464 5.29484 8.5 5.56006 8.5H10.0601C10.3253 8.5 10.5796 8.39464 10.7672 8.20711C10.9547 8.01957 11.0601 7.76522 11.0601 7.5C11.0601 7.23478 10.9547 6.98043 10.7672 6.79289C10.5796 6.60536 10.3253 6.5 10.0601 6.5H7.66006C8.57177 5.53701 9.70856 4.81576 10.9682 4.40114C12.2278 3.98651 13.5707 3.89152 14.8762 4.1247C16.1816 4.35788 17.4086 4.91193 18.4468 5.73699C19.485 6.56205 20.3018 7.63226 20.8238 8.85133C21.3457 10.0704 21.5564 11.4001 21.4369 12.7208C21.3175 14.0415 20.8716 15.3118 20.1393 16.4174C19.4071 17.5231 18.4115 18.4293 17.2421 19.0547C16.0727 19.68 14.7662 20.0049 13.4401 20C13.1748 20 12.9205 20.1054 12.733 20.2929C12.5454 20.4804 12.4401 20.7348 12.4401 21C12.4401 21.2652 12.5454 21.5196 12.733 21.7071C12.9205 21.8946 13.1748 22 13.4401 22C16.0922 22 18.6358 20.9464 20.5111 19.0711C22.3865 17.1957 23.4401 14.6522 23.4401 12C23.4401 9.34784 22.3865 6.8043 20.5111 4.92893C18.6358 3.05357 16.0922 2 13.4401 2ZM13.4401 8C13.1748 8 12.9205 8.10536 12.733 8.29289C12.5454 8.48043 12.4401 8.73478 12.4401 9V12C12.4401 12.2652 12.5454 12.5196 12.733 12.7071C12.9205 12.8946 13.1748 13 13.4401 13H15.4401C15.7053 13 15.9596 12.8946 16.1472 12.7071C16.3347 12.5196 16.4401 12.2652 16.4401 12C16.4401 11.7348 16.3347 11.4804 16.1472 11.2929C15.9596 11.1054 15.7053 11 15.4401 11H14.4401V9C14.4401 8.73478 14.3347 8.48043 14.1472 8.29289C13.9596 8.10536 13.7053 8 13.4401 8Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M3.75355 11.7274V19.0001H2.21591V13.1869H2.1733L0.507812 14.2309V12.8673L2.30824 11.7274H3.75355Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M8.33363 19.1599C7.72283 19.1575 7.19727 19.0072 6.75692 18.7089C6.31895 18.4106 5.98159 17.9785 5.74485 17.4127C5.51048 16.8469 5.39447 16.1663 5.39684 15.3708C5.39684 14.5777 5.51403 13.9018 5.7484 13.3431C5.98514 12.7844 6.3225 12.3595 6.76048 12.0683C7.20082 11.7747 7.7252 11.6279 8.33363 11.6279C8.94206 11.6279 9.46526 11.7747 9.90323 12.0683C10.3436 12.3618 10.6821 12.788 10.9189 13.3467C11.1556 13.903 11.2728 14.5777 11.2704 15.3708C11.2704 16.1686 11.152 16.8505 10.9153 17.4163C10.6809 17.9821 10.3448 18.4142 9.90678 18.7124C9.46881 19.0107 8.94442 19.1599 8.33363 19.1599ZM8.33363 17.885C8.7503 17.885 9.08292 17.6755 9.3315 17.2565C9.58008 16.8374 9.70318 16.2089 9.70082 15.3708C9.70082 14.8192 9.644 14.3599 9.53036 13.993C9.41909 13.626 9.26048 13.3502 9.05451 13.1656C8.85091 12.9809 8.61062 12.8886 8.33363 12.8886C7.91933 12.8886 7.58789 13.0957 7.33931 13.51C7.09073 13.9243 6.96526 14.5446 6.96289 15.3708C6.96289 15.9295 7.01853 16.3959 7.12979 16.77C7.24343 17.1417 7.40323 17.421 7.6092 17.608C7.81516 17.7927 8.05664 17.885 8.33363 17.885Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>`,
          click: function () {
            this.backward = 10;
          },
        },
        {
          index: 2,
          position: "right",
          tooltip: "+10 giây",
          html: ` <button type="button" class="text-white hidden md:block">
              <svg
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5599 2C15.1236 2.00731 17.5865 2.99891 19.4399 4.77V3C19.4399 2.73478 19.5453 2.48043 19.7328 2.29289C19.9204 2.10536 20.1747 2 20.4399 2C20.7052 2 20.9595 2.10536 21.147 2.29289C21.3346 2.48043 21.4399 2.73478 21.4399 3V7.5C21.4399 7.76522 21.3346 8.01957 21.147 8.20711C20.9595 8.39464 20.7052 8.5 20.4399 8.5H15.9399C15.6747 8.5 15.4204 8.39464 15.2328 8.20711C15.0453 8.01957 14.9399 7.76522 14.9399 7.5C14.9399 7.23478 15.0453 6.98043 15.2328 6.79289C15.4204 6.60536 15.6747 6.5 15.9399 6.5H18.3399C17.4282 5.53701 16.2914 4.81576 15.0318 4.40114C13.7722 3.98651 12.4293 3.89152 11.1238 4.1247C9.81836 4.35788 8.59135 4.91193 7.55317 5.73699C6.51498 6.56205 5.69817 7.63226 5.17623 8.85133C4.65429 10.0704 4.44357 11.4001 4.56305 12.7208C4.68253 14.0415 5.12845 15.3118 5.86069 16.4174C6.59293 17.5231 7.58853 18.4293 8.75793 19.0547C9.92733 19.68 11.2338 20.0049 12.5599 20C12.8252 20 13.0795 20.1054 13.267 20.2929C13.4546 20.4804 13.5599 20.7348 13.5599 21C13.5599 21.2652 13.4546 21.5196 13.267 21.7071C13.0795 21.8946 12.8252 22 12.5599 22C9.90778 22 7.36424 20.9464 5.48887 19.0711C3.61351 17.1957 2.55994 14.6522 2.55994 12C2.55994 9.34784 3.61351 6.8043 5.48887 4.92893C7.36424 3.05357 9.90778 2 12.5599 2ZM12.5599 8C12.8252 8 13.0795 8.10536 13.267 8.29289C13.4546 8.48043 13.5599 8.73478 13.5599 9V12C13.5599 12.2652 13.4546 12.5196 13.267 12.7071C13.0795 12.8946 12.8252 13 12.5599 13H10.5599C10.2947 13 10.0404 12.8946 9.85283 12.7071C9.6653 12.5196 9.55994 12.2652 9.55994 12C9.55994 11.7348 9.6653 11.4804 9.85283 11.2929C10.0404 11.1054 10.2947 11 10.5599 11H11.5599V9C11.5599 8.73478 11.6653 8.48043 11.8528 8.29289C12.0404 8.10536 12.2947 8 12.5599 8Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M18.7536 11.7274V19.0001H17.2159V13.1869H17.1733L15.5078 14.2309V12.8673L17.3082 11.7274H18.7536Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M23.3336 19.1599C22.7228 19.1575 22.1973 19.0072 21.7569 18.7089C21.319 18.4106 20.9816 17.9785 20.7449 17.4127C20.5105 16.8469 20.3945 16.1663 20.3968 15.3708C20.3968 14.5777 20.514 13.9018 20.7484 13.3431C20.9851 12.7844 21.3225 12.3595 21.7605 12.0683C22.2008 11.7747 22.7252 11.6279 23.3336 11.6279C23.9421 11.6279 24.4653 11.7747 24.9032 12.0683C25.3436 12.3618 25.6821 12.788 25.9189 13.3467C26.1556 13.903 26.2728 14.5777 26.2704 15.3708C26.2704 16.1686 26.152 16.8505 25.9153 17.4163C25.6809 17.9821 25.3448 18.4142 24.9068 18.7124C24.4688 19.0107 23.9444 19.1599 23.3336 19.1599ZM23.3336 17.885C23.7503 17.885 24.0829 17.6755 24.3315 17.2565C24.5801 16.8374 24.7032 16.2089 24.7008 15.3708C24.7008 14.8192 24.644 14.3599 24.5304 13.993C24.4191 13.626 24.2605 13.3502 24.0545 13.1656C23.8509 12.9809 23.6106 12.8886 23.3336 12.8886C22.9193 12.8886 22.5879 13.0957 22.3393 13.51C22.0907 13.9243 21.9653 14.5446 21.9629 15.3708C21.9629 15.9295 22.0185 16.3959 22.1298 16.77C22.2434 17.1417 22.4032 17.421 22.6092 17.608C22.8152 17.7927 23.0566 17.885 23.3336 17.885Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>`,
          click: function () {
            this.forward = 10;
          },
        },
      ],
      customType: {
        m3u8: playM3u8,
      },
      plugins: [
        artplayerPluginHlsControl({
          quality: {
            // Show qualitys in setting
            setting: true,
            // Get the quality name from level
            getName: (level) => (level as Level).height + "P",
            title: "Chất lượng",
            auto: "Tự động",
          },
          audio: {
            // Show audios in setting
            setting: true,
            // Get the audio name from track
            getName: (track) => (track as Level).name,
            title: "Âm thanh",
            auto: "Tự động",
          },
        }),
      ],
      i18n: {
        vi: {
          Play: "Phát (k)",
          Pause: "Tạm dừng (k)",
          "Show Setting": "Cài đặt",
          "Play Speed": "Tốc độ phát",
          "Video Flip": "Xoay video",
          "PIP Mode": "Trình phát thu nhỏ (i)",
          "Aspect Ratio": "Tỷ lệ khung hình",
          Mute: "Tắt tiếng (m)",
          Volume: "Âm lượng",
          Fullscreen: "Toàn màn hình (f)",
          "Exit Fullscreen": "Thoát (f)",
          "Exit PIP Mode": "Thoát (i)",
          Normal: "Bình thường",
          Horizontal: "Xoay ngang",
          Vertical: "Xoay dọc",
          Open: "Mở",
          Close: "Đóng",
          Default: "Mặc định",
        },
        tr: {},
        id: {},
        en: {},
        "zh-cn": {},
        "zh-tw": {},
        pl: {},
        cs: {},
        es: {},
        fa: {},
        fr: {},
        ru: {},
        ar: {},
      },
    });

    if (isAndroid) {
      art.on("fullscreen", (state) => {
        if (state) {
          screen.orientation.lock("landscape");
        } else {
          screen.orientation.unlock();
        }
      });
    }

    artRef.current = art;

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [getInstance, option]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const art = artRef.current;
      if (!art || isSearchFocus) return;

      if (e.key === "m" || e.key === "M") {
        art.muted = !art.muted;
      }
      if (e.key === "f" || e.key === "F") {
        art.fullscreen = !art.fullscreen;
      }

      if (e.key === "i" || e.key === "I") {
        art.pip = !art.pip;
      }

      if (e.key === "k" || e.key === "K") {
        if (art.video.paused) {
          art.play();
        } else {
          art.pause();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchFocus]);

  return <div ref={containerRef} {...rest} className="w-full h-full"></div>;
}
