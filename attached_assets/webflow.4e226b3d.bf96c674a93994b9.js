
/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => { // webpackBootstrap
var __webpack_modules__ = ({
"5897": (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";
/* eslint-env browser */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cleanupElement: function() {
        return cleanupElement;
    },
    createInstance: function() {
        return createInstance;
    },
    destroy: function() {
        return destroy;
    },
    init: function() {
        return init;
    },
    ready: function() {
        return ready;
    }
});
__webpack_require__(2897);
__webpack_require__(233);
__webpack_require__(9754);
__webpack_require__(971);
__webpack_require__(2374);
__webpack_require__(5152);
__webpack_require__(5273);
__webpack_require__(172);
const _findIndex = /*#__PURE__*/ _interop_require_default(__webpack_require__(3142));
const _LottieFetchUtils = __webpack_require__(7933);
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getLottieLibrary = (win)=>win.Webflow.require('lottie').lottie;
const isInDesigner = (win)=>Boolean(win.Webflow.env('design') || win.Webflow.env('preview'));
const PlayerState = {
    Playing: 'playing',
    Stopped: 'stopped'
};
class Cache {
    _cache = [];
    set(container, instance) {
        const index = (0, _findIndex.default)(this._cache, ({ wrapper })=>wrapper === container);
        if (index !== -1) this._cache.splice(index, 1);
        this._cache.push({
            wrapper: container,
            instance
        });
    }
    delete(container) {
        const index = (0, _findIndex.default)(this._cache, ({ wrapper })=>wrapper === container);
        if (index !== -1) this._cache.splice(index, 1);
    }
    get(container) {
        const index = (0, _findIndex.default)(this._cache, ({ wrapper })=>wrapper === container);
        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
        return index !== -1 ? this._cache[index].instance : null;
    }
}
const cache = new Cache();
const emptyObject = {};
class LottieInstance {
    config = null;
    currentState = PlayerState.Stopped;
    animationItem;
    handlers = {
        enterFrame: [],
        complete: [],
        loop: [],
        dataReady: [],
        destroy: [],
        error: []
    };
    load(container) {
        const dataset = container.dataset || emptyObject;
        const src = dataset.src || '';
        if (src.endsWith('.lottie')) {
            (0, _LottieFetchUtils.fetchLottie)(src).then((animationData)=>{
                this._loadAnimation(container, animationData);
            });
        } else {
            this._loadAnimation(container, undefined);
        }
        cache.set(container, this);
        this.container = container;
    }
    _loadAnimation(container, animationData) {
        const dataset = container.dataset || emptyObject;
        const src = dataset.src || '';
        // Available options here https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
        const preserveAspectRatio = dataset.preserveAspectRatio || 'xMidYMid meet';
        const renderer = dataset.renderer || 'svg';
        // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
        const loop = parseFloat(dataset.loop) === 1;
        // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
        const direction = parseFloat(dataset.direction) || 1;
        // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
        const autoplay = parseFloat(dataset.autoplay) === 1;
        // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
        const duration = parseFloat(dataset.duration) || 0;
        // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
        const hasIx2 = parseFloat(dataset.isIx2Target) === 1;
        // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
        let ix2InitialValue = parseFloat(dataset.ix2InitialState);
        if (isNaN(ix2InitialValue)) {
            // @ts-expect-error - TS2322 - Type 'null' is not assignable to type 'number'.
            ix2InitialValue = null;
        }
        const config = {
            src,
            loop,
            autoplay,
            renderer,
            direction,
            duration,
            hasIx2,
            ix2InitialValue,
            preserveAspectRatio
        };
        // If it's the same path/src, don't destroy the animation
        if (this.animationItem && this.config && this.config.src === src && renderer === this.config.renderer && preserveAspectRatio === this.config.preserveAspectRatio) {
            if (loop !== this.config.loop) {
                this.setLooping(loop);
            }
            if (!hasIx2) {
                if (direction !== this.config.direction) {
                    // @ts-expect-error - TS2345 - Argument of type 'number' is not assignable to parameter of type '1 | -1'.
                    this.setDirection(direction);
                }
                if (duration !== this.config.duration) {
                    if (duration > 0 && duration !== this.duration) {
                        this.setSpeed(this.duration / duration);
                    } else {
                        this.setSpeed(1);
                    }
                }
            }
            if (autoplay) {
                this.play();
            }
            if (ix2InitialValue && ix2InitialValue !== this.config.ix2InitialValue) {
                const percent = ix2InitialValue / 100;
                this.goToFrame(this.frames * percent);
            }
            // @ts-expect-error - TS2322 - Type '{ readonly src: string; readonly loop: boolean; readonly autoplay: boolean; readonly renderer: string; readonly direction: number; readonly duration: number; readonly hasIx2: boolean; readonly ix2InitialValue: number; readonly preserveAspectRatio: string; }' is not assignable to type 'LoadAnimation'.
            this.config = config;
            return;
        }
        const options = {
            container,
            loop,
            autoplay,
            renderer,
            rendererSettings: {
                preserveAspectRatio,
                progressiveLoad: true,
                hideOnTransparent: true
            }
        };
        const win = container.ownerDocument.defaultView;
        try {
            // Clear previous animation, if any
            if (this.animationItem) {
                this.destroy();
            }
            // Initialize lottie player and load animation
            this.animationItem = getLottieLibrary(win).loadAnimation({
                ...options,
                ...animationData ? {
                    animationData
                } : {
                    path: src
                }
            });
        } catch (err) {
            this.handlers.error.forEach((cb)=>cb(err));
            return;
        }
        if (!this.animationItem) return;
        if (isInDesigner(win)) {
            // Calculate and save the current progress of the animation
            this.animationItem.addEventListener('enterFrame', ()=>{
                if (!this.isPlaying) return;
                const { currentFrame, totalFrames, playDirection } = this.animationItem;
                const toPercent = currentFrame / totalFrames * 100;
                const percentage = Math.round(playDirection === 1 ? toPercent : 100 - toPercent);
                this.handlers.enterFrame.forEach((cb)=>cb(percentage, currentFrame));
            });
            // Handle animation play complete
            this.animationItem.addEventListener('complete', ()=>{
                if (this.currentState !== PlayerState.Playing) {
                    this.handlers.complete.forEach((cb)=>cb());
                    return;
                }
                if (!this.animationItem.loop) {
                    this.handlers.complete.forEach((cb)=>cb());
                    return;
                }
                this.currentState = PlayerState.Stopped;
            });
            // Handle animation play complete
            this.animationItem.addEventListener('loopComplete', (loopComplete)=>{
                this.handlers.loop.forEach((cb)=>cb(loopComplete));
            });
            // Set error state when animation load fail event triggers
            // @ts-expect-error - TS7006 - Parameter 'err' implicitly has an 'any' type.
            this.animationItem.addEventListener('data_failed', (err)=>{
                this.handlers.error.forEach((cb)=>cb(err));
            });
            // Set error state when animation load fail event triggers
            // @ts-expect-error - TS7006 - Parameter 'err' implicitly has an 'any' type.
            this.animationItem.addEventListener('error', (err)=>{
                this.handlers.error.forEach((cb)=>cb(err));
            });
        }
        if (this.isLoaded) {
            this.handlers.dataReady.forEach((cb)=>cb());
            if (autoplay) {
                this.play();
            }
        } else {
            // Handle animation data load complete
            this.animationItem.addEventListener('data_ready', ()=>{
                this.handlers.dataReady.forEach((cb)=>cb());
                // Only set the direction and speed if no IX2 is attached
                if (!hasIx2) {
                    // @ts-expect-error - TS2345 - Argument of type 'number' is not assignable to parameter of type '1 | -1'.
                    this.setDirection(direction);
                    if (duration > 0 && duration !== this.duration) {
                        this.setSpeed(this.duration / duration);
                    }
                    if (autoplay) {
                        this.play();
                    }
                }
                // Set the animation's initial state value from IX2
                if (ix2InitialValue) {
                    const percent = ix2InitialValue / 100;
                    this.goToFrame(this.frames * percent);
                }
            });
        }
        // @ts-expect-error - TS2322 - Type '{ readonly src: string; readonly loop: boolean; readonly autoplay: boolean; readonly renderer: string; readonly direction: number; readonly duration: number; readonly hasIx2: boolean; readonly ix2InitialValue: number; readonly preserveAspectRatio: string; }' is not assignable to type 'LoadAnimation'.
        this.config = config;
    }
    onFrameChange(cb) {
        if (this.handlers.enterFrame.indexOf(cb) === -1) {
            this.handlers.enterFrame.push(cb);
        }
    }
    onPlaybackComplete(cb) {
        if (this.handlers.complete.indexOf(cb) === -1) {
            this.handlers.complete.push(cb);
        }
    }
    onLoopComplete(cb) {
        if (this.handlers.loop.indexOf(cb) === -1) {
            this.handlers.loop.push(cb);
        }
    }
    onDestroy(cb) {
        if (this.handlers.destroy.indexOf(cb) === -1) {
            this.handlers.destroy.push(cb);
        }
    }
    onDataReady(cb) {
        if (this.handlers.dataReady.indexOf(cb) === -1) {
            this.handlers.dataReady.push(cb);
        }
    }
    onError(cb) {
        if (this.handlers.error.indexOf(cb) === -1) {
            this.handlers.error.push(cb);
        }
    }
    play() {
        if (!this.animationItem) return;
        const frame = this.animationItem.playDirection === 1 ? 0 : this.frames;
        this.animationItem.goToAndPlay(frame, true);
        this.currentState = PlayerState.Playing;
    }
    stop() {
        if (!this.animationItem) return;
        if (this.isPlaying) {
            const { playDirection } = this.animationItem;
            const frame = playDirection === 1 ? 0 : this.frames;
            this.animationItem.goToAndStop(frame, true);
        }
        this.currentState = PlayerState.Stopped;
    }
    destroy() {
        if (!this.animationItem) return;
        if (this.isPlaying) this.stop();
        this.handlers.destroy.forEach((cb)=>cb());
        if (this.container) {
            cache.delete(this.container);
        }
        this.animationItem.destroy();
        Object.keys(this.handlers).forEach(// @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ enterFrame: OnFrameChangeCallback[]; complete: (() => void)[]; loop: OnLoopCompleteCallback[]; dataReady: (() => void)[]; destroy: (() => void)[]; error: ((arg1: Error) => void)[]; }'.
        (key)=>this.handlers[key].length = 0);
        this.animationItem = null;
        this.container = null;
        this.config = null;
    }
    // @ts-expect-error - TS2416 - Property 'isPlaying' in type 'LottieInstance' is not assignable to the same property in base type 'LottieItem'.
    get isPlaying() {
        if (!this.animationItem) return false;
        return !this.animationItem.isPaused;
    }
    // @ts-expect-error - TS2416 - Property 'isPaused' in type 'LottieInstance' is not assignable to the same property in base type 'LottieItem'.
    get isPaused() {
        if (!this.animationItem) return false;
        return this.animationItem.isPaused;
    }
    // @ts-expect-error - TS2416 - Property 'duration' in type 'LottieInstance' is not assignable to the same property in base type 'LottieItem'.
    get duration() {
        if (!this.animationItem) return 0;
        return this.animationItem.getDuration();
    }
    // @ts-expect-error - TS2416 - Property 'frames' in type 'LottieInstance' is not assignable to the same property in base type 'LottieItem'.
    get frames() {
        if (!this.animationItem) return 0;
        return this.animationItem.totalFrames;
    }
    // @ts-expect-error - TS2416 - Property 'direction' in type 'LottieInstance' is not assignable to the same property in base type 'LottieItem'.
    get direction() {
        if (!this.animationItem) return 1;
        return this.animationItem.playDirection;
    }
    // @ts-expect-error - TS2416 - Property 'isLoaded' in type 'LottieInstance' is not assignable to the same property in base type 'LottieItem'.
    get isLoaded() {
        if (!this.animationItem) false;
        return this.animationItem.isLoaded;
    }
    get ix2InitialValue() {
        return this.config ? this.config.ix2InitialValue : null;
    }
    goToFrame(value) {
        if (!this.animationItem) return;
        this.animationItem.setCurrentRawFrameValue(value);
    }
    setSubframe(value) {
        if (!this.animationItem) return;
        this.animationItem.setSubframe(value);
    }
    setSpeed(value = 1) {
        if (!this.animationItem) return;
        if (this.isPlaying) this.stop();
        this.animationItem.setSpeed(value);
    }
    setLooping(value) {
        if (!this.animationItem) return;
        if (this.isPlaying) this.stop();
        this.animationItem.loop = value;
    }
    setDirection(value) {
        if (!this.animationItem) return;
        if (this.isPlaying) this.stop();
        this.animationItem.setDirection(value);
        this.goToFrame(value === 1 ? 0 : this.frames);
    }
}
const getLottieElements = ()=>Array.from(document.querySelectorAll('[data-animation-type="lottie"]'));
const createInstance = (container)=>{
    let lottieInstance = cache.get(container);
    if (lottieInstance == null) {
        lottieInstance = new LottieInstance();
    }
    lottieInstance.load(container);
    return lottieInstance;
};
const cleanupElement = (element)=>{
    const lottieInstance = cache.get(element);
    if (lottieInstance) {
        lottieInstance.destroy();
    }
};
const init = ()=>{
    getLottieElements().forEach((element)=>{
        // @ts-expect-error - TS2345 - Argument of type 'string | null' is not assignable to parameter of type 'string'.
        const hasIx2 = parseFloat(element.getAttribute('data-is-ix2-target')) === 1;
        if (!hasIx2) {
            cleanupElement(element);
        }
        createInstance(element);
    });
};
const destroy = ()=>{
    getLottieElements().forEach(cleanupElement);
};
const ready = init;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRpZVNpdGVNb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmltcG9ydCBmaW5kSW5kZXggZnJvbSAnbG9kYXNoL2ZpbmRJbmRleCc7XG5pbXBvcnQgJ2NvcmUtanMvZmVhdHVyZXMvYXJyYXknO1xuXG5pbXBvcnQgdHlwZSB7XG4gIExvdHRpZUl0ZW0sXG4gIE9uRnJhbWVDaGFuZ2VDYWxsYmFjayxcbiAgT25Mb29wQ29tcGxldGVDYWxsYmFjayxcbn0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7ZmV0Y2hMb3R0aWV9IGZyb20gJ0BwYWNrYWdlcy9zeXN0ZW1zL2NvcmUvdXRpbHMvTG90dGllRmV0Y2hVdGlscyc7XG5cbmNvbnN0IGdldExvdHRpZUxpYnJhcnkgPSAod2luOiBXaW5kb3cpID0+IHdpbi5XZWJmbG93LnJlcXVpcmUoJ2xvdHRpZScpLmxvdHRpZTtcblxuY29uc3QgaXNJbkRlc2lnbmVyID0gKHdpbjogV2luZG93KSA9PlxuICBCb29sZWFuKHdpbi5XZWJmbG93LmVudignZGVzaWduJykgfHwgd2luLldlYmZsb3cuZW52KCdwcmV2aWV3JykpO1xuXG5jb25zdCBQbGF5ZXJTdGF0ZSA9IHtcbiAgUGxheWluZzogJ3BsYXlpbmcnIGFzIGNvbnN0LFxuICBTdG9wcGVkOiAnc3RvcHBlZCcgYXMgY29uc3QsXG59IGFzIGNvbnN0O1xuXG50eXBlIExvYWRBbmltYXRpb24gPSB7XG4gIHNyYzogc3RyaW5nO1xuICBsb29wOiBib29sZWFuO1xuICBhdXRvcGxheTogYm9vbGVhbjtcbiAgcmVuZGVyZXI6ICdzdmcnIHwgJ2NhbnZhcyc7XG4gIGRpcmVjdGlvbjogMSB8IC0xO1xuICBkdXJhdGlvbjogbnVtYmVyO1xuICBoYXNJeDI6IGJvb2xlYW47XG4gIGl4MkluaXRpYWxWYWx1ZTogbnVsbCB8IG51bWJlcjtcbiAgcHJlc2VydmVBc3BlY3RSYXRpbzogc3RyaW5nO1xufTtcblxuY2xhc3MgQ2FjaGUge1xuICBfY2FjaGU6IEFycmF5PHtcbiAgICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcbiAgICBpbnN0YW5jZTogTG90dGllSW5zdGFuY2U7XG4gIH0+ID0gW107XG5cbiAgc2V0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGluc3RhbmNlOiBMb3R0aWVJbnN0YW5jZSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gZmluZEluZGV4KHRoaXMuX2NhY2hlLCAoe3dyYXBwZXJ9KSA9PiB3cmFwcGVyID09PSBjb250YWluZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHRoaXMuX2NhY2hlLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5fY2FjaGUucHVzaCh7d3JhcHBlcjogY29udGFpbmVyLCBpbnN0YW5jZX0pO1xuICB9XG5cbiAgZGVsZXRlKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IGZpbmRJbmRleCh0aGlzLl9jYWNoZSwgKHt3cmFwcGVyfSkgPT4gd3JhcHBlciA9PT0gY29udGFpbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLl9jYWNoZS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgZ2V0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBMb3R0aWVJbnN0YW5jZSB8IG51bGwge1xuICAgIGNvbnN0IGluZGV4ID0gZmluZEluZGV4KHRoaXMuX2NhY2hlLCAoe3dyYXBwZXJ9KSA9PiB3cmFwcGVyID09PSBjb250YWluZXIpO1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzI1MzIgLSBPYmplY3QgaXMgcG9zc2libHkgJ3VuZGVmaW5lZCcuXG4gICAgcmV0dXJuIGluZGV4ICE9PSAtMSA/IHRoaXMuX2NhY2hlW2luZGV4XS5pbnN0YW5jZSA6IG51bGw7XG4gIH1cbn1cblxuY29uc3QgY2FjaGUgPSBuZXcgQ2FjaGUoKTtcbmNvbnN0IGVtcHR5T2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG5cbmNsYXNzIExvdHRpZUluc3RhbmNlIGltcGxlbWVudHMgTG90dGllSXRlbSB7XG4gIGNvbmZpZzogbnVsbCB8IExvYWRBbmltYXRpb24gPSBudWxsO1xuICBkZWNsYXJlIGNvbnRhaW5lcjogbnVsbCB8IEhUTUxFbGVtZW50O1xuICBjdXJyZW50U3RhdGU6ICh0eXBlb2YgUGxheWVyU3RhdGUpW2tleW9mIHR5cGVvZiBQbGF5ZXJTdGF0ZV0gPVxuICAgIFBsYXllclN0YXRlLlN0b3BwZWQ7XG4gIGFuaW1hdGlvbkl0ZW06IGFueTtcblxuICBoYW5kbGVyczoge1xuICAgIGVudGVyRnJhbWU6IEFycmF5PE9uRnJhbWVDaGFuZ2VDYWxsYmFjaz47XG4gICAgY29tcGxldGU6IEFycmF5PCgpID0+IHZvaWQ+O1xuICAgIGxvb3A6IEFycmF5PE9uTG9vcENvbXBsZXRlQ2FsbGJhY2s+O1xuICAgIGRhdGFSZWFkeTogQXJyYXk8KCkgPT4gdm9pZD47XG4gICAgZGVzdHJveTogQXJyYXk8KCkgPT4gdm9pZD47XG4gICAgZXJyb3I6IEFycmF5PChhcmcxOiBFcnJvcikgPT4gdm9pZD47XG4gIH0gPSB7XG4gICAgZW50ZXJGcmFtZTogW10sXG4gICAgY29tcGxldGU6IFtdLFxuICAgIGxvb3A6IFtdLFxuICAgIGRhdGFSZWFkeTogW10sXG4gICAgZGVzdHJveTogW10sXG4gICAgZXJyb3I6IFtdLFxuICB9O1xuXG4gIGxvYWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGFzZXQgPSBjb250YWluZXIuZGF0YXNldCB8fCBlbXB0eU9iamVjdDtcbiAgICBjb25zdCBzcmMgPSBkYXRhc2V0LnNyYyB8fCAnJztcblxuICAgIGlmIChzcmMuZW5kc1dpdGgoJy5sb3R0aWUnKSkge1xuICAgICAgZmV0Y2hMb3R0aWUoc3JjKS50aGVuKChhbmltYXRpb25EYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuX2xvYWRBbmltYXRpb24oY29udGFpbmVyLCBhbmltYXRpb25EYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sb2FkQW5pbWF0aW9uKGNvbnRhaW5lciwgdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgY2FjaGUuc2V0KGNvbnRhaW5lciwgdGhpcyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBfbG9hZEFuaW1hdGlvbihcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIGFuaW1hdGlvbkRhdGE/OiBSZWNvcmQ8YW55LCBhbnk+XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGFzZXQgPSBjb250YWluZXIuZGF0YXNldCB8fCBlbXB0eU9iamVjdDtcbiAgICBjb25zdCBzcmMgPSBkYXRhc2V0LnNyYyB8fCAnJztcbiAgICAvLyBBdmFpbGFibGUgb3B0aW9ucyBoZXJlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvcHJlc2VydmVBc3BlY3RSYXRpb1xuICAgIGNvbnN0IHByZXNlcnZlQXNwZWN0UmF0aW8gPSBkYXRhc2V0LnByZXNlcnZlQXNwZWN0UmF0aW8gfHwgJ3hNaWRZTWlkIG1lZXQnO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gZGF0YXNldC5yZW5kZXJlciB8fCAoJ3N2ZycgYXMgJ3N2ZycgfCAnY2FudmFzJyk7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRTMjM0NSAtIEFyZ3VtZW50IG9mIHR5cGUgJ3N0cmluZyB8IHVuZGVmaW5lZCcgaXMgbm90IGFzc2lnbmFibGUgdG8gcGFyYW1ldGVyIG9mIHR5cGUgJ3N0cmluZycuXG4gICAgY29uc3QgbG9vcCA9IHBhcnNlRmxvYXQoZGF0YXNldC5sb29wKSA9PT0gMTtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzQ1IC0gQXJndW1lbnQgb2YgdHlwZSAnc3RyaW5nIHwgdW5kZWZpbmVkJyBpcyBub3QgYXNzaWduYWJsZSB0byBwYXJhbWV0ZXIgb2YgdHlwZSAnc3RyaW5nJy5cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBwYXJzZUZsb2F0KGRhdGFzZXQuZGlyZWN0aW9uKSB8fCAoMSBhcyAxIHwgLTEpO1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzIzNDUgLSBBcmd1bWVudCBvZiB0eXBlICdzdHJpbmcgfCB1bmRlZmluZWQnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHBhcmFtZXRlciBvZiB0eXBlICdzdHJpbmcnLlxuICAgIGNvbnN0IGF1dG9wbGF5ID0gcGFyc2VGbG9hdChkYXRhc2V0LmF1dG9wbGF5KSA9PT0gMTtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzQ1IC0gQXJndW1lbnQgb2YgdHlwZSAnc3RyaW5nIHwgdW5kZWZpbmVkJyBpcyBub3QgYXNzaWduYWJsZSB0byBwYXJhbWV0ZXIgb2YgdHlwZSAnc3RyaW5nJy5cbiAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlRmxvYXQoZGF0YXNldC5kdXJhdGlvbikgfHwgMDtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzQ1IC0gQXJndW1lbnQgb2YgdHlwZSAnc3RyaW5nIHwgdW5kZWZpbmVkJyBpcyBub3QgYXNzaWduYWJsZSB0byBwYXJhbWV0ZXIgb2YgdHlwZSAnc3RyaW5nJy5cbiAgICBjb25zdCBoYXNJeDIgPSBwYXJzZUZsb2F0KGRhdGFzZXQuaXNJeDJUYXJnZXQpID09PSAxO1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzIzNDUgLSBBcmd1bWVudCBvZiB0eXBlICdzdHJpbmcgfCB1bmRlZmluZWQnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHBhcmFtZXRlciBvZiB0eXBlICdzdHJpbmcnLlxuICAgIGxldCBpeDJJbml0aWFsVmFsdWUgPSBwYXJzZUZsb2F0KGRhdGFzZXQuaXgySW5pdGlhbFN0YXRlKTtcblxuICAgIGlmIChpc05hTihpeDJJbml0aWFsVmFsdWUpKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzIyIC0gVHlwZSAnbnVsbCcgaXMgbm90IGFzc2lnbmFibGUgdG8gdHlwZSAnbnVtYmVyJy5cbiAgICAgIGl4MkluaXRpYWxWYWx1ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgc3JjLFxuICAgICAgbG9vcCxcbiAgICAgIGF1dG9wbGF5LFxuICAgICAgcmVuZGVyZXIsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBkdXJhdGlvbixcbiAgICAgIGhhc0l4MixcbiAgICAgIGl4MkluaXRpYWxWYWx1ZSxcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW8sXG4gICAgfSBhcyBjb25zdDtcblxuICAgIC8vIElmIGl0J3MgdGhlIHNhbWUgcGF0aC9zcmMsIGRvbid0IGRlc3Ryb3kgdGhlIGFuaW1hdGlvblxuICAgIGlmIChcbiAgICAgIHRoaXMuYW5pbWF0aW9uSXRlbSAmJlxuICAgICAgdGhpcy5jb25maWcgJiZcbiAgICAgIHRoaXMuY29uZmlnLnNyYyA9PT0gc3JjICYmXG4gICAgICByZW5kZXJlciA9PT0gdGhpcy5jb25maWcucmVuZGVyZXIgJiZcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW8gPT09IHRoaXMuY29uZmlnLnByZXNlcnZlQXNwZWN0UmF0aW9cbiAgICApIHtcbiAgICAgIGlmIChsb29wICE9PSB0aGlzLmNvbmZpZy5sb29wKSB7XG4gICAgICAgIHRoaXMuc2V0TG9vcGluZyhsb29wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXNJeDIpIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gdGhpcy5jb25maWcuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRTMjM0NSAtIEFyZ3VtZW50IG9mIHR5cGUgJ251bWJlcicgaXMgbm90IGFzc2lnbmFibGUgdG8gcGFyYW1ldGVyIG9mIHR5cGUgJzEgfCAtMScuXG4gICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkdXJhdGlvbiAhPT0gdGhpcy5jb25maWcuZHVyYXRpb24pIHtcbiAgICAgICAgICBpZiAoZHVyYXRpb24gPiAwICYmIGR1cmF0aW9uICE9PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNwZWVkKHRoaXMuZHVyYXRpb24gLyBkdXJhdGlvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3BlZWQoMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl4MkluaXRpYWxWYWx1ZSAmJiBpeDJJbml0aWFsVmFsdWUgIT09IHRoaXMuY29uZmlnLml4MkluaXRpYWxWYWx1ZSkge1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gaXgySW5pdGlhbFZhbHVlIC8gMTAwO1xuICAgICAgICB0aGlzLmdvVG9GcmFtZSh0aGlzLmZyYW1lcyAqIHBlcmNlbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzIyIC0gVHlwZSAneyByZWFkb25seSBzcmM6IHN0cmluZzsgcmVhZG9ubHkgbG9vcDogYm9vbGVhbjsgcmVhZG9ubHkgYXV0b3BsYXk6IGJvb2xlYW47IHJlYWRvbmx5IHJlbmRlcmVyOiBzdHJpbmc7IHJlYWRvbmx5IGRpcmVjdGlvbjogbnVtYmVyOyByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyOyByZWFkb25seSBoYXNJeDI6IGJvb2xlYW47IHJlYWRvbmx5IGl4MkluaXRpYWxWYWx1ZTogbnVtYmVyOyByZWFkb25seSBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBzdHJpbmc7IH0nIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ0xvYWRBbmltYXRpb24nLlxuICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGxvb3AsXG4gICAgICBhdXRvcGxheSxcbiAgICAgIHJlbmRlcmVyLFxuICAgICAgcmVuZGVyZXJTZXR0aW5nczoge1xuICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvLFxuICAgICAgICBwcm9ncmVzc2l2ZUxvYWQ6IHRydWUsXG4gICAgICAgIGhpZGVPblRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgfSxcbiAgICB9IGFzIGNvbnN0O1xuICAgIGNvbnN0IHdpbiA9IGNvbnRhaW5lci5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB0cnkge1xuICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgYW5pbWF0aW9uLCBpZiBhbnlcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkl0ZW0pIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEluaXRpYWxpemUgbG90dGllIHBsYXllciBhbmQgbG9hZCBhbmltYXRpb25cbiAgICAgIHRoaXMuYW5pbWF0aW9uSXRlbSA9IGdldExvdHRpZUxpYnJhcnkod2luKS5sb2FkQW5pbWF0aW9uKHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgLi4uKGFuaW1hdGlvbkRhdGEgPyB7YW5pbWF0aW9uRGF0YX0gOiB7cGF0aDogc3JjfSksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgdGhpcy5oYW5kbGVycy5lcnJvci5mb3JFYWNoKChjYikgPT4gY2IoZXJyKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybjtcblxuICAgIGlmIChpc0luRGVzaWduZXIod2luKSkge1xuICAgICAgLy8gQ2FsY3VsYXRlIGFuZCBzYXZlIHRoZSBjdXJyZW50IHByb2dyZXNzIG9mIHRoZSBhbmltYXRpb25cbiAgICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdlbnRlckZyYW1lJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qge2N1cnJlbnRGcmFtZSwgdG90YWxGcmFtZXMsIHBsYXlEaXJlY3Rpb259ID0gdGhpcy5hbmltYXRpb25JdGVtO1xuICAgICAgICBjb25zdCB0b1BlcmNlbnQgPSAoY3VycmVudEZyYW1lIC8gdG90YWxGcmFtZXMpICogMTAwO1xuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gTWF0aC5yb3VuZChcbiAgICAgICAgICBwbGF5RGlyZWN0aW9uID09PSAxID8gdG9QZXJjZW50IDogMTAwIC0gdG9QZXJjZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVycy5lbnRlckZyYW1lLmZvckVhY2goKGNiKSA9PiBjYihwZXJjZW50YWdlLCBjdXJyZW50RnJhbWUpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBIYW5kbGUgYW5pbWF0aW9uIHBsYXkgY29tcGxldGVcbiAgICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlICE9PSBQbGF5ZXJTdGF0ZS5QbGF5aW5nKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVycy5jb21wbGV0ZS5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0ubG9vcCkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlcnMuY29tcGxldGUuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFBsYXllclN0YXRlLlN0b3BwZWQ7XG4gICAgICB9KTtcblxuICAgICAgLy8gSGFuZGxlIGFuaW1hdGlvbiBwbGF5IGNvbXBsZXRlXG4gICAgICB0aGlzLmFuaW1hdGlvbkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2xvb3BDb21wbGV0ZScsXG4gICAgICAgIChsb29wQ29tcGxldGU6IHtjdXJyZW50TG9vcDogbnVtYmVyOyB0b3RhbExvb3BzOiBudW1iZXIgfCBib29sZWFufSkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlcnMubG9vcC5mb3JFYWNoKChjYikgPT4gY2IobG9vcENvbXBsZXRlKSk7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIC8vIFNldCBlcnJvciBzdGF0ZSB3aGVuIGFuaW1hdGlvbiBsb2FkIGZhaWwgZXZlbnQgdHJpZ2dlcnNcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzcwMDYgLSBQYXJhbWV0ZXIgJ2VycicgaW1wbGljaXRseSBoYXMgYW4gJ2FueScgdHlwZS5cbiAgICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdkYXRhX2ZhaWxlZCcsIChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5lcnJvci5mb3JFYWNoKChjYikgPT4gY2IoZXJyKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU2V0IGVycm9yIHN0YXRlIHdoZW4gYW5pbWF0aW9uIGxvYWQgZmFpbCBldmVudCB0cmlnZ2Vyc1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRTNzAwNiAtIFBhcmFtZXRlciAnZXJyJyBpbXBsaWNpdGx5IGhhcyBhbiAnYW55JyB0eXBlLlxuICAgICAgdGhpcy5hbmltYXRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZXJzLmVycm9yLmZvckVhY2goKGNiKSA9PiBjYihlcnIpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzTG9hZGVkKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzLmRhdGFSZWFkeS5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG5cbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGFuZGxlIGFuaW1hdGlvbiBkYXRhIGxvYWQgY29tcGxldGVcbiAgICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdkYXRhX3JlYWR5JywgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZXJzLmRhdGFSZWFkeS5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG5cbiAgICAgICAgLy8gT25seSBzZXQgdGhlIGRpcmVjdGlvbiBhbmQgc3BlZWQgaWYgbm8gSVgyIGlzIGF0dGFjaGVkXG4gICAgICAgIGlmICghaGFzSXgyKSB7XG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRTMjM0NSAtIEFyZ3VtZW50IG9mIHR5cGUgJ251bWJlcicgaXMgbm90IGFzc2lnbmFibGUgdG8gcGFyYW1ldGVyIG9mIHR5cGUgJzEgfCAtMScuXG4gICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZGlyZWN0aW9uKTtcblxuICAgICAgICAgIGlmIChkdXJhdGlvbiA+IDAgJiYgZHVyYXRpb24gIT09IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3BlZWQodGhpcy5kdXJhdGlvbiAvIGR1cmF0aW9uKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgYW5pbWF0aW9uJ3MgaW5pdGlhbCBzdGF0ZSB2YWx1ZSBmcm9tIElYMlxuICAgICAgICBpZiAoaXgySW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgcGVyY2VudCA9IGl4MkluaXRpYWxWYWx1ZSAvIDEwMDtcbiAgICAgICAgICB0aGlzLmdvVG9GcmFtZSh0aGlzLmZyYW1lcyAqIHBlcmNlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzIyIC0gVHlwZSAneyByZWFkb25seSBzcmM6IHN0cmluZzsgcmVhZG9ubHkgbG9vcDogYm9vbGVhbjsgcmVhZG9ubHkgYXV0b3BsYXk6IGJvb2xlYW47IHJlYWRvbmx5IHJlbmRlcmVyOiBzdHJpbmc7IHJlYWRvbmx5IGRpcmVjdGlvbjogbnVtYmVyOyByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyOyByZWFkb25seSBoYXNJeDI6IGJvb2xlYW47IHJlYWRvbmx5IGl4MkluaXRpYWxWYWx1ZTogbnVtYmVyOyByZWFkb25seSBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBzdHJpbmc7IH0nIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ0xvYWRBbmltYXRpb24nLlxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgb25GcmFtZUNoYW5nZShjYjogT25GcmFtZUNoYW5nZUNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMuZW50ZXJGcmFtZS5pbmRleE9mKGNiKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMuZW50ZXJGcmFtZS5wdXNoKGNiKTtcbiAgICB9XG4gIH1cblxuICBvblBsYXliYWNrQ29tcGxldGUoY2I6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycy5jb21wbGV0ZS5pbmRleE9mKGNiKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMuY29tcGxldGUucHVzaChjYik7XG4gICAgfVxuICB9XG5cbiAgb25Mb29wQ29tcGxldGUoY2I6IE9uTG9vcENvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycy5sb29wLmluZGV4T2YoY2IpID09PSAtMSkge1xuICAgICAgdGhpcy5oYW5kbGVycy5sb29wLnB1c2goY2IpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGVzdHJveShjYjogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzLmRlc3Ryb3kuaW5kZXhPZihjYikgPT09IC0xKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzLmRlc3Ryb3kucHVzaChjYik7XG4gICAgfVxuICB9XG5cbiAgb25EYXRhUmVhZHkoY2I6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycy5kYXRhUmVhZHkuaW5kZXhPZihjYikgPT09IC0xKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzLmRhdGFSZWFkeS5wdXNoKGNiKTtcbiAgICB9XG4gIH1cblxuICBvbkVycm9yKGNiOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMuZXJyb3IuaW5kZXhPZihjYikgPT09IC0xKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzLmVycm9yLnB1c2goY2IpO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybjtcbiAgICBjb25zdCBmcmFtZSA9IHRoaXMuYW5pbWF0aW9uSXRlbS5wbGF5RGlyZWN0aW9uID09PSAxID8gMCA6IHRoaXMuZnJhbWVzO1xuICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5nb1RvQW5kUGxheShmcmFtZSwgdHJ1ZSk7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBQbGF5ZXJTdGF0ZS5QbGF5aW5nO1xuICB9XG5cbiAgc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9uSXRlbSkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICBjb25zdCB7cGxheURpcmVjdGlvbn0gPSB0aGlzLmFuaW1hdGlvbkl0ZW07XG4gICAgICBjb25zdCBmcmFtZSA9IHBsYXlEaXJlY3Rpb24gPT09IDEgPyAwIDogdGhpcy5mcmFtZXM7XG4gICAgICB0aGlzLmFuaW1hdGlvbkl0ZW0uZ29Ub0FuZFN0b3AoZnJhbWUsIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gUGxheWVyU3RhdGUuU3RvcHBlZDtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybjtcblxuICAgIGlmICh0aGlzLmlzUGxheWluZykgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy5oYW5kbGVycy5kZXN0cm95LmZvckVhY2goKGNiKSA9PiBjYigpKTtcblxuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgY2FjaGUuZGVsZXRlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFuaW1hdGlvbkl0ZW0uZGVzdHJveSgpO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmZvckVhY2goXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFM3MDUzIC0gRWxlbWVudCBpbXBsaWNpdGx5IGhhcyBhbiAnYW55JyB0eXBlIGJlY2F1c2UgZXhwcmVzc2lvbiBvZiB0eXBlICdzdHJpbmcnIGNhbid0IGJlIHVzZWQgdG8gaW5kZXggdHlwZSAneyBlbnRlckZyYW1lOiBPbkZyYW1lQ2hhbmdlQ2FsbGJhY2tbXTsgY29tcGxldGU6ICgoKSA9PiB2b2lkKVtdOyBsb29wOiBPbkxvb3BDb21wbGV0ZUNhbGxiYWNrW107IGRhdGFSZWFkeTogKCgpID0+IHZvaWQpW107IGRlc3Ryb3k6ICgoKSA9PiB2b2lkKVtdOyBlcnJvcjogKChhcmcxOiBFcnJvcikgPT4gdm9pZClbXTsgfScuXG4gICAgICAoa2V5KSA9PiAodGhpcy5oYW5kbGVyc1trZXldLmxlbmd0aCA9IDApXG4gICAgKTtcbiAgICB0aGlzLmFuaW1hdGlvbkl0ZW0gPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmNvbmZpZyA9IG51bGw7XG4gIH1cblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyNDE2IC0gUHJvcGVydHkgJ2lzUGxheWluZycgaW4gdHlwZSAnTG90dGllSW5zdGFuY2UnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHRoZSBzYW1lIHByb3BlcnR5IGluIGJhc2UgdHlwZSAnTG90dGllSXRlbScuXG4gIGdldCBpc1BsYXlpbmcoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIXRoaXMuYW5pbWF0aW9uSXRlbS5pc1BhdXNlZDtcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzI0MTYgLSBQcm9wZXJ0eSAnaXNQYXVzZWQnIGluIHR5cGUgJ0xvdHRpZUluc3RhbmNlJyBpcyBub3QgYXNzaWduYWJsZSB0byB0aGUgc2FtZSBwcm9wZXJ0eSBpbiBiYXNlIHR5cGUgJ0xvdHRpZUl0ZW0nLlxuICBnZXQgaXNQYXVzZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRpb25JdGVtLmlzUGF1c2VkO1xuICB9XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRTMjQxNiAtIFByb3BlcnR5ICdkdXJhdGlvbicgaW4gdHlwZSAnTG90dGllSW5zdGFuY2UnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHRoZSBzYW1lIHByb3BlcnR5IGluIGJhc2UgdHlwZSAnTG90dGllSXRlbScuXG4gIGdldCBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5hbmltYXRpb25JdGVtKSByZXR1cm4gMDtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRpb25JdGVtLmdldER1cmF0aW9uKCk7XG4gIH1cblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyNDE2IC0gUHJvcGVydHkgJ2ZyYW1lcycgaW4gdHlwZSAnTG90dGllSW5zdGFuY2UnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHRoZSBzYW1lIHByb3BlcnR5IGluIGJhc2UgdHlwZSAnTG90dGllSXRlbScuXG4gIGdldCBmcmFtZXMoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9uSXRlbSkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uSXRlbS50b3RhbEZyYW1lcztcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzI0MTYgLSBQcm9wZXJ0eSAnZGlyZWN0aW9uJyBpbiB0eXBlICdMb3R0aWVJbnN0YW5jZScgaXMgbm90IGFzc2lnbmFibGUgdG8gdGhlIHNhbWUgcHJvcGVydHkgaW4gYmFzZSB0eXBlICdMb3R0aWVJdGVtJy5cbiAgZ2V0IGRpcmVjdGlvbigpOiAxIHwgLTEge1xuICAgIGlmICghdGhpcy5hbmltYXRpb25JdGVtKSByZXR1cm4gMTtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRpb25JdGVtLnBsYXlEaXJlY3Rpb247XG4gIH1cblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyNDE2IC0gUHJvcGVydHkgJ2lzTG9hZGVkJyBpbiB0eXBlICdMb3R0aWVJbnN0YW5jZScgaXMgbm90IGFzc2lnbmFibGUgdG8gdGhlIHNhbWUgcHJvcGVydHkgaW4gYmFzZSB0eXBlICdMb3R0aWVJdGVtJy5cbiAgZ2V0IGlzTG9hZGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hbmltYXRpb25JdGVtKSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRpb25JdGVtLmlzTG9hZGVkO1xuICB9XG5cbiAgZ2V0IGl4MkluaXRpYWxWYWx1ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcgPyB0aGlzLmNvbmZpZy5peDJJbml0aWFsVmFsdWUgOiBudWxsO1xuICB9XG5cbiAgZ29Ub0ZyYW1lKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9uSXRlbSkgcmV0dXJuO1xuICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5zZXRDdXJyZW50UmF3RnJhbWVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBzZXRTdWJmcmFtZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5hbmltYXRpb25JdGVtKSByZXR1cm47XG4gICAgdGhpcy5hbmltYXRpb25JdGVtLnNldFN1YmZyYW1lKHZhbHVlKTtcbiAgfVxuXG4gIHNldFNwZWVkKHZhbHVlOiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybjtcbiAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5zZXRTcGVlZCh2YWx1ZSk7XG4gIH1cblxuICBzZXRMb29waW5nKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkl0ZW0pIHJldHVybjtcbiAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuYW5pbWF0aW9uSXRlbS5sb29wID0gdmFsdWU7XG4gIH1cblxuICBzZXREaXJlY3Rpb24odmFsdWU6IDEgfCAtMSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hbmltYXRpb25JdGVtKSByZXR1cm47XG4gICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLmFuaW1hdGlvbkl0ZW0uc2V0RGlyZWN0aW9uKHZhbHVlKTtcbiAgICB0aGlzLmdvVG9GcmFtZSh2YWx1ZSA9PT0gMSA/IDAgOiB0aGlzLmZyYW1lcyk7XG4gIH1cbn1cblxuY29uc3QgZ2V0TG90dGllRWxlbWVudHMgPSAoKTogQXJyYXk8SFRNTEVsZW1lbnQ+ID0+XG4gIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYW5pbWF0aW9uLXR5cGU9XCJsb3R0aWVcIl0nKSk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVJbnN0YW5jZSA9IChjb250YWluZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gIGxldCBsb3R0aWVJbnN0YW5jZSA9IGNhY2hlLmdldChjb250YWluZXIpO1xuXG4gIGlmIChsb3R0aWVJbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgbG90dGllSW5zdGFuY2UgPSBuZXcgTG90dGllSW5zdGFuY2UoKTtcbiAgfVxuXG4gIGxvdHRpZUluc3RhbmNlLmxvYWQoY29udGFpbmVyKTtcblxuICByZXR1cm4gbG90dGllSW5zdGFuY2U7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYW51cEVsZW1lbnQgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgY29uc3QgbG90dGllSW5zdGFuY2UgPSBjYWNoZS5nZXQoZWxlbWVudCk7XG4gIGlmIChsb3R0aWVJbnN0YW5jZSkge1xuICAgIGxvdHRpZUluc3RhbmNlLmRlc3Ryb3koKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGdldExvdHRpZUVsZW1lbnRzKCkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUUzIzNDUgLSBBcmd1bWVudCBvZiB0eXBlICdzdHJpbmcgfCBudWxsJyBpcyBub3QgYXNzaWduYWJsZSB0byBwYXJhbWV0ZXIgb2YgdHlwZSAnc3RyaW5nJy5cbiAgICBjb25zdCBoYXNJeDIgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlzLWl4Mi10YXJnZXQnKSkgPT09IDE7XG5cbiAgICBpZiAoIWhhc0l4Mikge1xuICAgICAgY2xlYW51cEVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgY3JlYXRlSW5zdGFuY2UoZWxlbWVudCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gIGdldExvdHRpZUVsZW1lbnRzKCkuZm9yRWFjaChjbGVhbnVwRWxlbWVudCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZHkgPSBpbml0O1xuIl0sIm5hbWVzIjpbImNsZWFudXBFbGVtZW50IiwiY3JlYXRlSW5zdGFuY2UiLCJkZXN0cm95IiwiaW5pdCIsInJlYWR5IiwiZ2V0TG90dGllTGlicmFyeSIsIndpbiIsIldlYmZsb3ciLCJyZXF1aXJlIiwibG90dGllIiwiaXNJbkRlc2lnbmVyIiwiQm9vbGVhbiIsImVudiIsIlBsYXllclN0YXRlIiwiUGxheWluZyIsIlN0b3BwZWQiLCJDYWNoZSIsIl9jYWNoZSIsInNldCIsImNvbnRhaW5lciIsImluc3RhbmNlIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJ3cmFwcGVyIiwic3BsaWNlIiwicHVzaCIsImRlbGV0ZSIsImdldCIsImNhY2hlIiwiZW1wdHlPYmplY3QiLCJMb3R0aWVJbnN0YW5jZSIsImNvbmZpZyIsImN1cnJlbnRTdGF0ZSIsImFuaW1hdGlvbkl0ZW0iLCJoYW5kbGVycyIsImVudGVyRnJhbWUiLCJjb21wbGV0ZSIsImxvb3AiLCJkYXRhUmVhZHkiLCJlcnJvciIsImxvYWQiLCJkYXRhc2V0Iiwic3JjIiwiZW5kc1dpdGgiLCJmZXRjaExvdHRpZSIsInRoZW4iLCJhbmltYXRpb25EYXRhIiwiX2xvYWRBbmltYXRpb24iLCJ1bmRlZmluZWQiLCJwcmVzZXJ2ZUFzcGVjdFJhdGlvIiwicmVuZGVyZXIiLCJwYXJzZUZsb2F0IiwiZGlyZWN0aW9uIiwiYXV0b3BsYXkiLCJkdXJhdGlvbiIsImhhc0l4MiIsImlzSXgyVGFyZ2V0IiwiaXgySW5pdGlhbFZhbHVlIiwiaXgySW5pdGlhbFN0YXRlIiwiaXNOYU4iLCJzZXRMb29waW5nIiwic2V0RGlyZWN0aW9uIiwic2V0U3BlZWQiLCJwbGF5IiwicGVyY2VudCIsImdvVG9GcmFtZSIsImZyYW1lcyIsIm9wdGlvbnMiLCJyZW5kZXJlclNldHRpbmdzIiwicHJvZ3Jlc3NpdmVMb2FkIiwiaGlkZU9uVHJhbnNwYXJlbnQiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJsb2FkQW5pbWF0aW9uIiwicGF0aCIsImVyciIsImZvckVhY2giLCJjYiIsImFkZEV2ZW50TGlzdGVuZXIiLCJpc1BsYXlpbmciLCJjdXJyZW50RnJhbWUiLCJ0b3RhbEZyYW1lcyIsInBsYXlEaXJlY3Rpb24iLCJ0b1BlcmNlbnQiLCJwZXJjZW50YWdlIiwiTWF0aCIsInJvdW5kIiwibG9vcENvbXBsZXRlIiwiaXNMb2FkZWQiLCJvbkZyYW1lQ2hhbmdlIiwiaW5kZXhPZiIsIm9uUGxheWJhY2tDb21wbGV0ZSIsIm9uTG9vcENvbXBsZXRlIiwib25EZXN0cm95Iiwib25EYXRhUmVhZHkiLCJvbkVycm9yIiwiZnJhbWUiLCJnb1RvQW5kUGxheSIsInN0b3AiLCJnb1RvQW5kU3RvcCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJsZW5ndGgiLCJpc1BhdXNlZCIsImdldER1cmF0aW9uIiwidmFsdWUiLCJzZXRDdXJyZW50UmF3RnJhbWVWYWx1ZSIsInNldFN1YmZyYW1lIiwiZ2V0TG90dGllRWxlbWVudHMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb3R0aWVJbnN0YW5jZSIsImVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjs7Ozs7Ozs7Ozs7SUF3Y1RBLGNBQWM7ZUFBZEE7O0lBWkFDLGNBQWM7ZUFBZEE7O0lBZ0NBQyxPQUFPO2VBQVBBOztJQWJBQyxJQUFJO2VBQUpBOztJQWlCQUMsS0FBSztlQUFMQTs7Ozs7Ozs7Ozs7a0VBOWRTO2tDQVNJOzs7Ozs7QUFFMUIsTUFBTUMsbUJBQW1CLENBQUNDLE1BQWdCQSxJQUFJQyxPQUFPLENBQUNDLE9BQU8sQ0FBQyxVQUFVQyxNQUFNO0FBRTlFLE1BQU1DLGVBQWUsQ0FBQ0osTUFDcEJLLFFBQVFMLElBQUlDLE9BQU8sQ0FBQ0ssR0FBRyxDQUFDLGFBQWFOLElBQUlDLE9BQU8sQ0FBQ0ssR0FBRyxDQUFDO0FBRXZELE1BQU1DLGNBQWM7SUFDbEJDLFNBQVM7SUFDVEMsU0FBUztBQUNYO0FBY0EsTUFBTUM7SUFDSkMsU0FHSyxFQUFFLENBQUM7SUFFUkMsSUFBSUMsU0FBc0IsRUFBRUMsUUFBd0IsRUFBUTtRQUMxRCxNQUFNQyxRQUFRQyxJQUFBQSxrQkFBUyxFQUFDLElBQUksQ0FBQ0wsTUFBTSxFQUFFLENBQUMsRUFBQ00sT0FBTyxFQUFDLEdBQUtBLFlBQVlKO1FBQ2hFLElBQUlFLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQ0osTUFBTSxDQUFDTyxNQUFNLENBQUNILE9BQU87UUFD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

}),
"1565": (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";
/* eslint-env browser */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createInstance: function() {
        return createInstance;
    },
    destroy: function() {
        return destroy;
    },
    destroyInstance: function() {
        return destroyInstance;
    },
    getInstance: function() {
        return getInstance;
    },
    init: function() {
        return init;
    },
    ready: function() {
        return ready;
    },
    setLoadHandler: function() {
        return setLoadHandler;
    }
});
let SplineApp;
async function importSplineRuntime() {
    const { Application } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 9303));
    SplineApp = Application;
}
const cache = new Map();
const callbacks = new Map();
const loadEvent = new Event('w-spline-load');
class SplineInstance {
    spline;
    container;
    destroy() {
        if (this.container) {
            cache.delete(this.container);
            callbacks.delete(this.container);
        }
        this.spline?.dispose?.();
    }
    async load(container, scene) {
        if (!SplineApp) {
            await importSplineRuntime();
        }
        const canvas = container.querySelector('canvas');
        const spline = new SplineApp(canvas);
        await spline.load(scene);
        cache.set(container, this);
        this.container = container;
        this.spline = spline;
        container.dispatchEvent(loadEvent);
        if (callbacks.has(container)) {
            callbacks.get(container)(spline);
            callbacks.delete(container);
        }
    }
}
const getSplineElements = ()=>Array.from(document.querySelectorAll('[data-animation-type="spline"]'));
const createInstance = async (container, scene)=>{
    let splineInstance = cache.get(container);
    if (splineInstance == null) {
        splineInstance = new SplineInstance();
    }
    await splineInstance.load(container, scene);
    return splineInstance;
};
const destroyInstance = (element)=>{
    const splineInstance = cache.get(element);
    splineInstance?.destroy();
};
const getInstance = (element)=>{
    return cache.get(element);
};
const setLoadHandler = (element, callback)=>{
    callbacks.set(element, callback);
};
const init = ()=>{
    getSplineElements().forEach((element)=>{
        const scene = element.getAttribute('data-spline-url');
        if (scene) {
            createInstance(element, scene);
        }
    });
};
const destroy = ()=>{
    getSplineElements().forEach(destroyInstance);
};
const ready = init;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNwbGluZVNpdGVNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmxldCBTcGxpbmVBcHA7XG5cbmFzeW5jIGZ1bmN0aW9uIGltcG9ydFNwbGluZVJ1bnRpbWUoKSB7XG4gIGNvbnN0IHtBcHBsaWNhdGlvbn0gPSBhd2FpdCBpbXBvcnQoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnJlc29sdmVkLCBpbXBvcnQvZXh0ZW5zaW9uc1xuICAgICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BzcGxpbmV0b29sL3J1bnRpbWUvYnVpbGQvcnVudGltZS5qcydcbiAgKTtcbiAgU3BsaW5lQXBwID0gQXBwbGljYXRpb247XG59XG5cbmNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xuY29uc3QgY2FsbGJhY2tzID0gbmV3IE1hcCgpO1xuY29uc3QgbG9hZEV2ZW50ID0gbmV3IEV2ZW50KCd3LXNwbGluZS1sb2FkJyk7XG5cbmNsYXNzIFNwbGluZUluc3RhbmNlIHtcbiAgc3BsaW5lO1xuICBjb250YWluZXI7XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgIGNhY2hlLmRlbGV0ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICBjYWxsYmFja3MuZGVsZXRlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gICAgdGhpcy5zcGxpbmU/LmRpc3Bvc2U/LigpO1xuICB9XG5cbiAgYXN5bmMgbG9hZChjb250YWluZXIsIHNjZW5lKSB7XG4gICAgaWYgKCFTcGxpbmVBcHApIHtcbiAgICAgIGF3YWl0IGltcG9ydFNwbGluZVJ1bnRpbWUoKTtcbiAgICB9XG4gICAgY29uc3QgY2FudmFzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuICAgIGNvbnN0IHNwbGluZSA9IG5ldyBTcGxpbmVBcHAoY2FudmFzKTtcbiAgICBhd2FpdCBzcGxpbmUubG9hZChzY2VuZSk7XG4gICAgY2FjaGUuc2V0KGNvbnRhaW5lciwgdGhpcyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5zcGxpbmUgPSBzcGxpbmU7XG4gICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobG9hZEV2ZW50KTtcbiAgICBpZiAoY2FsbGJhY2tzLmhhcyhjb250YWluZXIpKSB7XG4gICAgICBjYWxsYmFja3MuZ2V0KGNvbnRhaW5lcikoc3BsaW5lKTtcbiAgICAgIGNhbGxiYWNrcy5kZWxldGUoY29udGFpbmVyKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZ2V0U3BsaW5lRWxlbWVudHMgPSAoKSA9PlxuICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFuaW1hdGlvbi10eXBlPVwic3BsaW5lXCJdJykpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlSW5zdGFuY2UgPSBhc3luYyAoY29udGFpbmVyLCBzY2VuZSkgPT4ge1xuICBsZXQgc3BsaW5lSW5zdGFuY2UgPSBjYWNoZS5nZXQoY29udGFpbmVyKTtcbiAgaWYgKHNwbGluZUluc3RhbmNlID09IG51bGwpIHtcbiAgICBzcGxpbmVJbnN0YW5jZSA9IG5ldyBTcGxpbmVJbnN0YW5jZSgpO1xuICB9XG4gIGF3YWl0IHNwbGluZUluc3RhbmNlLmxvYWQoY29udGFpbmVyLCBzY2VuZSk7XG4gIHJldHVybiBzcGxpbmVJbnN0YW5jZTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXN0cm95SW5zdGFuY2UgPSAoZWxlbWVudCkgPT4ge1xuICBjb25zdCBzcGxpbmVJbnN0YW5jZSA9IGNhY2hlLmdldChlbGVtZW50KTtcbiAgc3BsaW5lSW5zdGFuY2U/LmRlc3Ryb3koKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbnN0YW5jZSA9IChlbGVtZW50KSA9PiB7XG4gIHJldHVybiBjYWNoZS5nZXQoZWxlbWVudCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0TG9hZEhhbmRsZXIgPSAoZWxlbWVudCwgY2FsbGJhY2spID0+IHtcbiAgY2FsbGJhY2tzLnNldChlbGVtZW50LCBjYWxsYmFjayk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgZ2V0U3BsaW5lRWxlbWVudHMoKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgY29uc3Qgc2NlbmUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcGxpbmUtdXJsJyk7XG4gICAgaWYgKHNjZW5lKSB7XG4gICAgICBjcmVhdGVJbnN0YW5jZShlbGVtZW50LCBzY2VuZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICBnZXRTcGxpbmVFbGVtZW50cygpLmZvckVhY2goZGVzdHJveUluc3RhbmNlKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWFkeSA9IGluaXQ7XG4iXSwibmFtZXMiOlsiY3JlYXRlSW5zdGFuY2UiLCJkZXN0cm95IiwiZGVzdHJveUluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJpbml0IiwicmVhZHkiLCJzZXRMb2FkSGFuZGxlciIsIlNwbGluZUFwcCIsImltcG9ydFNwbGluZVJ1bnRpbWUiLCJBcHBsaWNhdGlvbiIsImNhY2hlIiwiTWFwIiwiY2FsbGJhY2tzIiwibG9hZEV2ZW50IiwiRXZlbnQiLCJTcGxpbmVJbnN0YW5jZSIsInNwbGluZSIsImNvbnRhaW5lciIsImRlbGV0ZSIsImRpc3Bvc2UiLCJsb2FkIiwic2NlbmUiLCJjYW52YXMiLCJxdWVyeVNlbGVjdG9yIiwic2V0IiwiZGlzcGF0Y2hFdmVudCIsImhhcyIsImdldCIsImdldFNwbGluZUVsZW1lbnRzIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3BsaW5lSW5zdGFuY2UiLCJlbGVtZW50IiwiY2FsbGJhY2siLCJmb3JFYWNoIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiQUFBQSxzQkFBc0I7Ozs7Ozs7Ozs7O0lB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

}),
"2444": (function (module, __unused_webpack_exports, __webpack_require__) {
"use strict";

var Webflow = __webpack_require__(3949);
var lottieSiteModule = __webpack_require__(5897);
var lottie = __webpack_require__(8724);
Webflow.define('lottie', module.exports = function() {
    return {
        lottie,
        createInstance: lottieSiteModule.createInstance,
        cleanupElement: lottieSiteModule.cleanupElement,
        init: lottieSiteModule.init,
        destroy: lottieSiteModule.destroy,
        ready: lottieSiteModule.ready
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYmZsb3ctbG90dGllLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBXZWJmbG93ID0gcmVxdWlyZSgnLi4vQmFzZVNpdGVNb2R1bGVzL3dlYmZsb3ctbGliJyk7XG52YXIgbG90dGllU2l0ZU1vZHVsZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9Mb3R0aWVTaXRlTW9kdWxlJyk7XG52YXIgbG90dGllID0gcmVxdWlyZSgnbG90dGllLXdlYi9idWlsZC9wbGF5ZXIvbG90dGllLm1pbicpO1xuXG5XZWJmbG93LmRlZmluZShcbiAgJ2xvdHRpZScsXG4gIChtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG90dGllLFxuICAgICAgY3JlYXRlSW5zdGFuY2U6IGxvdHRpZVNpdGVNb2R1bGUuY3JlYXRlSW5zdGFuY2UsXG4gICAgICBjbGVhbnVwRWxlbWVudDogbG90dGllU2l0ZU1vZHVsZS5jbGVhbnVwRWxlbWVudCxcbiAgICAgIGluaXQ6IGxvdHRpZVNpdGVNb2R1bGUuaW5pdCxcbiAgICAgIGRlc3Ryb3k6IGxvdHRpZVNpdGVNb2R1bGUuZGVzdHJveSxcbiAgICAgIHJlYWR5OiBsb3R0aWVTaXRlTW9kdWxlLnJlYWR5LFxuICAgIH07XG4gIH0pXG4pO1xuIl0sIm5hbWVzIjpbIldlYmZsb3ciLCJyZXF1aXJlIiwibG90dGllU2l0ZU1vZHVsZSIsImxvdHRpZSIsImRlZmluZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVJbnN0YW5jZSIsImNsZWFudXBFbGVtZW50IiwiaW5pdCIsImRlc3Ryb3kiLCJyZWFkeSJdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUlBLFVBQVVDLFFBQVE7QUFDdEIsSUFBSUMsbUJBQW1CRCxRQUFRO0FBQy9CLElBQUlFLFNBQVNGLFFBQVE7QUFFckJELFFBQVFJLE1BQU0sQ0FDWixVQUNDQyxPQUFPQyxPQUFPLEdBQUc7SUFDaEIsT0FBTztRQUNMSDtRQUNBSSxnQkFBZ0JMLGlCQUFpQkssY0FBYztRQUMvQ0MsZ0JBQWdCTixpQkFBaUJNLGNBQWM7UUFDL0NDLE1BQU1QLGlCQUFpQk8sSUFBSTtRQUMzQkMsU0FBU1IsaUJBQWlCUSxPQUFPO1FBQ2pDQyxPQUFPVCxpQkFBaUJTLEtBQUs7SUFDL0I7QUFDRiJ9

}),
"9766": (function (module, __unused_webpack_exports, __webpack_require__) {
"use strict";

var Webflow = __webpack_require__(3949);
var siteModule = __webpack_require__(1565);
Webflow.define('spline', module.exports = function() {
    return {
        createInstance: siteModule.createInstance,
        destroyInstance: siteModule.destroyInstance,
        getInstance: siteModule.getInstance,
        setLoadHandler: siteModule.setLoadHandler,
        init: siteModule.init,
        destroy: siteModule.destroy,
        ready: siteModule.ready
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYmZsb3ctc3BsaW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBXZWJmbG93ID0gcmVxdWlyZSgnLi4vQmFzZVNpdGVNb2R1bGVzL3dlYmZsb3ctbGliJyk7XG52YXIgc2l0ZU1vZHVsZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9TcGxpbmVTaXRlTW9kdWxlJyk7XG5cbldlYmZsb3cuZGVmaW5lKFxuICAnc3BsaW5lJyxcbiAgKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjcmVhdGVJbnN0YW5jZTogc2l0ZU1vZHVsZS5jcmVhdGVJbnN0YW5jZSxcbiAgICAgIGRlc3Ryb3lJbnN0YW5jZTogc2l0ZU1vZHVsZS5kZXN0cm95SW5zdGFuY2UsXG4gICAgICBnZXRJbnN0YW5jZTogc2l0ZU1vZHVsZS5nZXRJbnN0YW5jZSxcbiAgICAgIHNldExvYWRIYW5kbGVyOiBzaXRlTW9kdWxlLnNldExvYWRIYW5kbGVyLFxuICAgICAgaW5pdDogc2l0ZU1vZHVsZS5pbml0LFxuICAgICAgZGVzdHJveTogc2l0ZU1vZHVsZS5kZXN0cm95LFxuICAgICAgcmVhZHk6IHNpdGVNb2R1bGUucmVhZHksXG4gICAgfTtcbiAgfSlcbik7XG4iXSwibmFtZXMiOlsiV2ViZmxvdyIsInJlcXVpcmUiLCJzaXRlTW9kdWxlIiwiZGVmaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUluc3RhbmNlIiwiZGVzdHJveUluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJzZXRMb2FkSGFuZGxlciIsImluaXQiLCJkZXN0cm95IiwicmVhZHkiXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJQSxVQUFVQyxRQUFRO0FBQ3RCLElBQUlDLGFBQWFELFFBQVE7QUFFekJELFFBQVFHLE1BQU0sQ0FDWixVQUNDQyxPQUFPQyxPQUFPLEdBQUc7SUFDaEIsT0FBTztRQUNMQyxnQkFBZ0JKLFdBQVdJLGNBQWM7UUFDekNDLGlCQUFpQkwsV0FBV0ssZUFBZTtRQUMzQ0MsYUFBYU4sV0FBV00sV0FBVztRQUNuQ0MsZ0JBQWdCUCxXQUFXTyxjQUFjO1FBQ3pDQyxNQUFNUixXQUFXUSxJQUFJO1FBQ3JCQyxTQUFTVCxXQUFXUyxPQUFPO1FBQzNCQyxPQUFPVixXQUFXVSxLQUFLO0lBQ3pCO0FBQ0YifQ==

}),
"9078": (function (module, __unused_webpack_exports, __webpack_require__) {
"use strict";
/* global document window */ /**
 * Webflow: Tabs component
 */ 
var Webflow = __webpack_require__(3949);
var IXEvents = __webpack_require__(5134);
Webflow.define('tabs', module.exports = function($) {
    var api = {};
    var tram = $.tram;
    var $doc = $(document);
    var $tabs;
    var design;
    var env = Webflow.env;
    var safari = env.safari;
    var inApp = env();
    var tabAttr = 'data-w-tab';
    var paneAttr = 'data-w-pane';
    var namespace = '.w-tabs';
    var linkCurrent = 'w--current';
    var tabActive = 'w--tab-active';
    var ix = IXEvents.triggers;
    var inRedraw = false;
    // -----------------------------------
    // Module methods
    api.ready = api.design = api.preview = init;
    api.redraw = function() {
        inRedraw = true;
        init();
        inRedraw = false;
    };
    api.destroy = function() {
        $tabs = $doc.find(namespace);
        if (!$tabs.length) {
            return;
        }
        $tabs.each(resetIX);
        removeListeners();
    };
    // -----------------------------------
    // Private methods
    function init() {
        design = inApp && Webflow.env('design');
        // Find all instances on the page
        $tabs = $doc.find(namespace);
        if (!$tabs.length) {
            return;
        }
        $tabs.each(build);
        if (Webflow.env('preview') && !inRedraw) {
            $tabs.each(resetIX);
        }
        removeListeners();
        addListeners();
    }
    function removeListeners() {
        Webflow.redraw.off(api.redraw);
    }
    function addListeners() {
        Webflow.redraw.on(api.redraw);
    }
    function resetIX(i, el) {
        var data = $.data(el, namespace);
        if (!data) {
            return;
        }
        data.links && data.links.each(ix.reset);
        data.panes && data.panes.each(ix.reset);
    }
    function build(i, el) {
        var widgetHash = namespace.substr(1) + '-' + i;
        var $el = $(el);
        // Store state in data
        var data = $.data(el, namespace);
        if (!data) {
            data = $.data(el, namespace, {
                el: $el,
                config: {}
            });
        }
        data.current = null;
        data.tabIdentifier = widgetHash + '-' + tabAttr;
        data.paneIdentifier = widgetHash + '-' + paneAttr;
        data.menu = $el.children('.w-tab-menu');
        data.links = data.menu.children('.w-tab-link');
        data.content = $el.children('.w-tab-content');
        data.panes = data.content.children('.w-tab-pane');
        // Remove old events
        data.el.off(namespace);
        data.links.off(namespace);
        // This role is necessary in the ARIA spec
        data.menu.attr('role', 'tablist');
        // Set all tabs unfocusable
        data.links.attr('tabindex', '-1');
        // Set config from data attributes
        configure(data);
        // Wire up events when not in design mode
        if (!design) {
            data.links.on('click' + namespace, linkSelect(data));
            data.links.on('keydown' + namespace, handleLinkKeydown(data));
            // Trigger first intro event from current tab
            var $link = data.links.filter('.' + linkCurrent);
            var tab = $link.attr(tabAttr);
            tab && changeTab(data, {
                tab,
                immediate: true
            });
        }
    }
    function configure(data) {
        var config = {};
        // Set config options from data attributes
        config.easing = data.el.attr('data-easing') || 'ease';
        var intro = parseInt(data.el.attr('data-duration-in'), 10);
        // eslint-disable-next-line no-self-compare
        intro = config.intro = intro === intro ? intro : 0;
        var outro = parseInt(data.el.attr('data-duration-out'), 10);
        // eslint-disable-next-line no-self-compare
        outro = config.outro = outro === outro ? outro : 0;
        config.immediate = !intro && !outro;
        // Store config in data
        data.config = config;
    }
    function getActiveTabIdx(data) {
        var tab = data.current;
        return Array.prototype.findIndex.call(data.links, (t)=>{
            return t.getAttribute(tabAttr) === tab;
        }, null);
    }
    function linkSelect(data) {
        return function(evt) {
            evt.preventDefault();
            var tab = evt.currentTarget.getAttribute(tabAttr);
            tab && changeTab(data, {
                tab
            });
        };
    }
    function handleLinkKeydown(data) {
        return function(evt) {
            var currentIdx = getActiveTabIdx(data);
            var keyName = evt.key;
            var keyMap = {
                ArrowLeft: currentIdx - 1,
                ArrowUp: currentIdx - 1,
                ArrowRight: currentIdx + 1,
                ArrowDown: currentIdx + 1,
                End: data.links.length - 1,
                Home: 0
            };
            // Bail out of function if this key is not
            // involved in tab management
            if (!(keyName in keyMap)) return;
            evt.preventDefault();
            var nextIdx = keyMap[keyName];
            // go back to end of tabs if we wrap past the start
            if (nextIdx === -1) {
                nextIdx = data.links.length - 1;
            }
            // go back to start if we wrap past the last tab
            if (nextIdx === data.links.length) {
                nextIdx = 0;
            }
            var tabEl = data.links[nextIdx];
            var tab = tabEl.getAttribute(tabAttr);
            tab && changeTab(data, {
                tab
            });
        };
    }
    function changeTab(data, options) {
        options = options || {};
        var config = data.config;
        var easing = config.easing;
        var tab = options.tab;
        // Don't select the same tab twice
        if (tab === data.current) {
            return;
        }
        data.current = tab;
        /**
       * The currently active tab.
       * Will be referenced to manage focus after
       * TabLink attributes are changed
       * @type {HTMLAnchorElement}
       */ var currentTab;
        // Select the current link
        data.links.each(function(i, el) {
            var $el = $(el);
            // Add important attributes at build time.
            if (options.immediate || config.immediate) {
                // Store corresponding pane for reference.
                var pane = data.panes[i];
                // IDs are necessary for ARIA relationships,
                // so if the user did not create one, we create one
                // using our generated identifier
                if (!el.id) {
                    el.id = data.tabIdentifier + '-' + i;
                }
                if (!pane.id) {
                    pane.id = data.paneIdentifier + '-' + i;
                }
                el.href = '#' + pane.id;
                // Tab elements must take this role
                el.setAttribute('role', 'tab');
                // Tab elements must reference the unique ID of the panel
                // that they control
                el.setAttribute('aria-controls', pane.id);
                // Tab elements must report that they are not selected
                // by default
                el.setAttribute('aria-selected', 'false');
                // Panes must take on the `Tabpanel` role
                pane.setAttribute('role', 'tabpanel');
                // Elements with tabpanel role must be labelled by
                // their controlling tab
                pane.setAttribute('aria-labelledby', el.id);
            }
            if (el.getAttribute(tabAttr) === tab) {
                // This is the current tab. Store it.
                currentTab = el;
                $el.addClass(linkCurrent).removeAttr('tabindex').attr({
                    'aria-selected': 'true'
                }).each(ix.intro);
            } else if ($el.hasClass(linkCurrent)) {
                $el.removeClass(linkCurrent).attr({
                    tabindex: '-1',
                    'aria-selected': 'false'
                }).each(ix.outro);
            }
        });
        // Find the new tab panes and keep track of previous
        var targets = [];
        var previous = [];
        data.panes.each(function(i, el) {
            var $el = $(el);
            if (el.getAttribute(tabAttr) === tab) {
                targets.push(el);
            } else if ($el.hasClass(tabActive)) {
                previous.push(el);
            }
        });
        var $targets = $(targets);
        var $previous = $(previous);
        // Switch tabs immediately and bypass transitions
        if (options.immediate || config.immediate) {
            $targets.addClass(tabActive).each(ix.intro);
            $previous.removeClass(tabActive);
            // Redraw to benefit components in the hidden tab pane
            // But only if not currently in the middle of a redraw
            if (!inRedraw) {
                Webflow.redraw.up();
            }
            return;
        } else {
            // Backwards compatible hack to prevent focus from scrolling
            var x = window.scrollX;
            var y = window.scrollY;
            currentTab.focus();
            window.scrollTo(x, y);
        }
        // Fade out the currently active tab before intro
        if ($previous.length && config.outro) {
            $previous.each(ix.outro);
            tram($previous).add('opacity ' + config.outro + 'ms ' + easing, {
                fallback: safari
            }).start({
                opacity: 0
            }).then(()=>fadeIn(config, $previous, $targets));
        } else {
            // Skip the outro and play intro
            fadeIn(config, $previous, $targets);
        }
    }
    // Fade in the new target
    function fadeIn(config, $previous, $targets) {
        // Clear previous active class + styles touched by tram
        // We cannot remove the whole inline style because it could be dynamically bound
        $previous.removeClass(tabActive).css({
            opacity: '',
            transition: '',
            transform: '',
            width: '',
            height: ''
        });
        // Add active class to new target
        $targets.addClass(tabActive).each(ix.intro);
        Webflow.redraw.up();
        // Set opacity immediately if intro is zero
        if (!config.intro) {
            return tram($targets).set({
                opacity: 1
            });
        }
        // Otherwise fade in opacity
        tram($targets).set({
            opacity: 0
        }).redraw().add('opacity ' + config.intro + 'ms ' + config.easing, {
            fallback: safari
        }).start({
            opacity: 1
        });
    }
    // Export module
    return api;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYmZsb3ctdGFicy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgZG9jdW1lbnQgd2luZG93ICovXG5cbi8qKlxuICogV2ViZmxvdzogVGFicyBjb21wb25lbnRcbiAqL1xuXG52YXIgV2ViZmxvdyA9IHJlcXVpcmUoJy4uL0Jhc2VTaXRlTW9kdWxlcy93ZWJmbG93LWxpYicpO1xudmFyIElYRXZlbnRzID0gcmVxdWlyZSgnLi4vQmFzZVNpdGVNb2R1bGVzL3dlYmZsb3ctaXgyLWV2ZW50cycpO1xuXG5XZWJmbG93LmRlZmluZShcbiAgJ3RhYnMnLFxuICAobW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJCkge1xuICAgIHZhciBhcGkgPSB7fTtcbiAgICB2YXIgdHJhbSA9ICQudHJhbTtcbiAgICB2YXIgJGRvYyA9ICQoZG9jdW1lbnQpO1xuICAgIHZhciAkdGFicztcbiAgICB2YXIgZGVzaWduO1xuICAgIHZhciBlbnYgPSBXZWJmbG93LmVudjtcbiAgICB2YXIgc2FmYXJpID0gZW52LnNhZmFyaTtcbiAgICB2YXIgaW5BcHAgPSBlbnYoKTtcbiAgICB2YXIgdGFiQXR0ciA9ICdkYXRhLXctdGFiJztcbiAgICB2YXIgcGFuZUF0dHIgPSAnZGF0YS13LXBhbmUnO1xuICAgIHZhciBuYW1lc3BhY2UgPSAnLnctdGFicyc7XG4gICAgdmFyIGxpbmtDdXJyZW50ID0gJ3ctLWN1cnJlbnQnO1xuICAgIHZhciB0YWJBY3RpdmUgPSAndy0tdGFiLWFjdGl2ZSc7XG4gICAgdmFyIGl4ID0gSVhFdmVudHMudHJpZ2dlcnM7XG5cbiAgICB2YXIgaW5SZWRyYXcgPSBmYWxzZTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gTW9kdWxlIG1ldGhvZHNcblxuICAgIGFwaS5yZWFkeSA9IGFwaS5kZXNpZ24gPSBhcGkucHJldmlldyA9IGluaXQ7XG5cbiAgICBhcGkucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaW5SZWRyYXcgPSB0cnVlO1xuICAgICAgaW5pdCgpO1xuICAgICAgaW5SZWRyYXcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgYXBpLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkdGFicyA9ICRkb2MuZmluZChuYW1lc3BhY2UpO1xuICAgICAgaWYgKCEkdGFicy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgJHRhYnMuZWFjaChyZXNldElYKTtcbiAgICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgIH07XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGRlc2lnbiA9IGluQXBwICYmIFdlYmZsb3cuZW52KCdkZXNpZ24nKTtcblxuICAgICAgLy8gRmluZCBhbGwgaW5zdGFuY2VzIG9uIHRoZSBwYWdlXG4gICAgICAkdGFicyA9ICRkb2MuZmluZChuYW1lc3BhY2UpO1xuICAgICAgaWYgKCEkdGFicy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgJHRhYnMuZWFjaChidWlsZCk7XG4gICAgICBpZiAoV2ViZmxvdy5lbnYoJ3ByZXZpZXcnKSAmJiAhaW5SZWRyYXcpIHtcbiAgICAgICAgJHRhYnMuZWFjaChyZXNldElYKTtcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgICBhZGRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgICBXZWJmbG93LnJlZHJhdy5vZmYoYXBpLnJlZHJhdyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICAgICAgV2ViZmxvdy5yZWRyYXcub24oYXBpLnJlZHJhdyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRJWChpLCBlbCkge1xuICAgICAgdmFyIGRhdGEgPSAkLmRhdGEoZWwsIG5hbWVzcGFjZSk7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGF0YS5saW5rcyAmJiBkYXRhLmxpbmtzLmVhY2goaXgucmVzZXQpO1xuICAgICAgZGF0YS5wYW5lcyAmJiBkYXRhLnBhbmVzLmVhY2goaXgucmVzZXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkKGksIGVsKSB7XG4gICAgICB2YXIgd2lkZ2V0SGFzaCA9IG5hbWVzcGFjZS5zdWJzdHIoMSkgKyAnLScgKyBpO1xuICAgICAgdmFyICRlbCA9ICQoZWwpO1xuXG4gICAgICAvLyBTdG9yZSBzdGF0ZSBpbiBkYXRhXG4gICAgICB2YXIgZGF0YSA9ICQuZGF0YShlbCwgbmFtZXNwYWNlKTtcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gJC5kYXRhKGVsLCBuYW1lc3BhY2UsIHtlbDogJGVsLCBjb25maWc6IHt9fSk7XG4gICAgICB9XG4gICAgICBkYXRhLmN1cnJlbnQgPSBudWxsO1xuICAgICAgZGF0YS50YWJJZGVudGlmaWVyID0gd2lkZ2V0SGFzaCArICctJyArIHRhYkF0dHI7XG4gICAgICBkYXRhLnBhbmVJZGVudGlmaWVyID0gd2lkZ2V0SGFzaCArICctJyArIHBhbmVBdHRyO1xuXG4gICAgICBkYXRhLm1lbnUgPSAkZWwuY2hpbGRyZW4oJy53LXRhYi1tZW51Jyk7XG4gICAgICBkYXRhLmxpbmtzID0gZGF0YS5tZW51LmNoaWxkcmVuKCcudy10YWItbGluaycpO1xuICAgICAgZGF0YS5jb250ZW50ID0gJGVsLmNoaWxkcmVuKCcudy10YWItY29udGVudCcpO1xuICAgICAgZGF0YS5wYW5lcyA9IGRhdGEuY29udGVudC5jaGlsZHJlbignLnctdGFiLXBhbmUnKTtcblxuICAgICAgLy8gUmVtb3ZlIG9sZCBldmVudHNcbiAgICAgIGRhdGEuZWwub2ZmKG5hbWVzcGFjZSk7XG4gICAgICBkYXRhLmxpbmtzLm9mZihuYW1lc3BhY2UpO1xuXG4gICAgICAvLyBUaGlzIHJvbGUgaXMgbmVjZXNzYXJ5IGluIHRoZSBBUklBIHNwZWNcbiAgICAgIGRhdGEubWVudS5hdHRyKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgICAgLy8gU2V0IGFsbCB0YWJzIHVuZm9jdXNhYmxlXG4gICAgICBkYXRhLmxpbmtzLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG5cbiAgICAgIC8vIFNldCBjb25maWcgZnJvbSBkYXRhIGF0dHJpYnV0ZXNcbiAgICAgIGNvbmZpZ3VyZShkYXRhKTtcblxuICAgICAgLy8gV2lyZSB1cCBldmVudHMgd2hlbiBub3QgaW4gZGVzaWduIG1vZGVcbiAgICAgIGlmICghZGVzaWduKSB7XG4gICAgICAgIGRhdGEubGlua3Mub24oJ2NsaWNrJyArIG5hbWVzcGFjZSwgbGlua1NlbGVjdChkYXRhKSk7XG4gICAgICAgIGRhdGEubGlua3Mub24oJ2tleWRvd24nICsgbmFtZXNwYWNlLCBoYW5kbGVMaW5rS2V5ZG93bihkYXRhKSk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBmaXJzdCBpbnRybyBldmVudCBmcm9tIGN1cnJlbnQgdGFiXG4gICAgICAgIHZhciAkbGluayA9IGRhdGEubGlua3MuZmlsdGVyKCcuJyArIGxpbmtDdXJyZW50KTtcbiAgICAgICAgdmFyIHRhYiA9ICRsaW5rLmF0dHIodGFiQXR0cik7XG4gICAgICAgIHRhYiAmJiBjaGFuZ2VUYWIoZGF0YSwge3RhYiwgaW1tZWRpYXRlOiB0cnVlfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlKGRhdGEpIHtcbiAgICAgIHZhciBjb25maWcgPSB7fTtcblxuICAgICAgLy8gU2V0IGNvbmZpZyBvcHRpb25zIGZyb20gZGF0YSBhdHRyaWJ1dGVzXG4gICAgICBjb25maWcuZWFzaW5nID0gZGF0YS5lbC5hdHRyKCdkYXRhLWVhc2luZycpIHx8ICdlYXNlJztcblxuICAgICAgdmFyIGludHJvID0gcGFyc2VJbnQoZGF0YS5lbC5hdHRyKCdkYXRhLWR1cmF0aW9uLWluJyksIDEwKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGludHJvID0gY29uZmlnLmludHJvID0gaW50cm8gPT09IGludHJvID8gaW50cm8gOiAwO1xuXG4gICAgICB2YXIgb3V0cm8gPSBwYXJzZUludChkYXRhLmVsLmF0dHIoJ2RhdGEtZHVyYXRpb24tb3V0JyksIDEwKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIG91dHJvID0gY29uZmlnLm91dHJvID0gb3V0cm8gPT09IG91dHJvID8gb3V0cm8gOiAwO1xuXG4gICAgICBjb25maWcuaW1tZWRpYXRlID0gIWludHJvICYmICFvdXRybztcblxuICAgICAgLy8gU3RvcmUgY29uZmlnIGluIGRhdGFcbiAgICAgIGRhdGEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFjdGl2ZVRhYklkeChkYXRhKSB7XG4gICAgICB2YXIgdGFiID0gZGF0YS5jdXJyZW50O1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXguY2FsbChcbiAgICAgICAgZGF0YS5saW5rcyxcbiAgICAgICAgKHQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdC5nZXRBdHRyaWJ1dGUodGFiQXR0cikgPT09IHRhYjtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaW5rU2VsZWN0KGRhdGEpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgdGFiID0gZXZ0LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKHRhYkF0dHIpO1xuICAgICAgICB0YWIgJiYgY2hhbmdlVGFiKGRhdGEsIHt0YWJ9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlua0tleWRvd24oZGF0YSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJZHggPSBnZXRBY3RpdmVUYWJJZHgoZGF0YSk7XG4gICAgICAgIHZhciBrZXlOYW1lID0gZXZ0LmtleTtcbiAgICAgICAgdmFyIGtleU1hcCA9IHtcbiAgICAgICAgICBBcnJvd0xlZnQ6IGN1cnJlbnRJZHggLSAxLFxuICAgICAgICAgIEFycm93VXA6IGN1cnJlbnRJZHggLSAxLFxuICAgICAgICAgIEFycm93UmlnaHQ6IGN1cnJlbnRJZHggKyAxLFxuICAgICAgICAgIEFycm93RG93bjogY3VycmVudElkeCArIDEsXG4gICAgICAgICAgRW5kOiBkYXRhLmxpbmtzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgSG9tZTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBCYWlsIG91dCBvZiBmdW5jdGlvbiBpZiB0aGlzIGtleSBpcyBub3RcbiAgICAgICAgLy8gaW52b2x2ZWQgaW4gdGFiIG1hbmFnZW1lbnRcbiAgICAgICAgaWYgKCEoa2V5TmFtZSBpbiBrZXlNYXApKSByZXR1cm47XG5cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIG5leHRJZHggPSBrZXlNYXBba2V5TmFtZV07XG5cbiAgICAgICAgLy8gZ28gYmFjayB0byBlbmQgb2YgdGFicyBpZiB3ZSB3cmFwIHBhc3QgdGhlIHN0YXJ0XG4gICAgICAgIGlmIChuZXh0SWR4ID09PSAtMSkge1xuICAgICAgICAgIG5leHRJZHggPSBkYXRhLmxpbmtzLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ28gYmFjayB0byBzdGFydCBpZiB3ZSB3cmFwIHBhc3QgdGhlIGxhc3QgdGFiXG4gICAgICAgIGlmIChuZXh0SWR4ID09PSBkYXRhLmxpbmtzLmxlbmd0aCkge1xuICAgICAgICAgIG5leHRJZHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0YWJFbCA9IGRhdGEubGlua3NbbmV4dElkeF07XG4gICAgICAgIHZhciB0YWIgPSB0YWJFbC5nZXRBdHRyaWJ1dGUodGFiQXR0cik7XG4gICAgICAgIHRhYiAmJiBjaGFuZ2VUYWIoZGF0YSwge3RhYn0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VUYWIoZGF0YSwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIHZhciBjb25maWcgPSBkYXRhLmNvbmZpZztcbiAgICAgIHZhciBlYXNpbmcgPSBjb25maWcuZWFzaW5nO1xuICAgICAgdmFyIHRhYiA9IG9wdGlvbnMudGFiO1xuXG4gICAgICAvLyBEb24ndCBzZWxlY3QgdGhlIHNhbWUgdGFiIHR3aWNlXG4gICAgICBpZiAodGFiID09PSBkYXRhLmN1cnJlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGF0YS5jdXJyZW50ID0gdGFiO1xuXG4gICAgICAvKipcbiAgICAgICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYi5cbiAgICAgICAqIFdpbGwgYmUgcmVmZXJlbmNlZCB0byBtYW5hZ2UgZm9jdXMgYWZ0ZXJcbiAgICAgICAqIFRhYkxpbmsgYXR0cmlidXRlcyBhcmUgY2hhbmdlZFxuICAgICAgICogQHR5cGUge0hUTUxBbmNob3JFbGVtZW50fVxuICAgICAgICovXG4gICAgICB2YXIgY3VycmVudFRhYjtcblxuICAgICAgLy8gU2VsZWN0IHRoZSBjdXJyZW50IGxpbmtcbiAgICAgIGRhdGEubGlua3MuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuXG4gICAgICAgIC8vIEFkZCBpbXBvcnRhbnQgYXR0cmlidXRlcyBhdCBidWlsZCB0aW1lLlxuICAgICAgICBpZiAob3B0aW9ucy5pbW1lZGlhdGUgfHwgY29uZmlnLmltbWVkaWF0ZSkge1xuICAgICAgICAgIC8vIFN0b3JlIGNvcnJlc3BvbmRpbmcgcGFuZSBmb3IgcmVmZXJlbmNlLlxuICAgICAgICAgIHZhciBwYW5lID0gZGF0YS5wYW5lc1tpXTtcbiAgICAgICAgICAvLyBJRHMgYXJlIG5lY2Vzc2FyeSBmb3IgQVJJQSByZWxhdGlvbnNoaXBzLFxuICAgICAgICAgIC8vIHNvIGlmIHRoZSB1c2VyIGRpZCBub3QgY3JlYXRlIG9uZSwgd2UgY3JlYXRlIG9uZVxuICAgICAgICAgIC8vIHVzaW5nIG91ciBnZW5lcmF0ZWQgaWRlbnRpZmllclxuICAgICAgICAgIGlmICghZWwuaWQpIHtcbiAgICAgICAgICAgIGVsLmlkID0gZGF0YS50YWJJZGVudGlmaWVyICsgJy0nICsgaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFwYW5lLmlkKSB7XG4gICAgICAgICAgICBwYW5lLmlkID0gZGF0YS5wYW5lSWRlbnRpZmllciArICctJyArIGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLmhyZWYgPSAnIycgKyBwYW5lLmlkO1xuXG4gICAgICAgICAgLy8gVGFiIGVsZW1lbnRzIG11c3QgdGFrZSB0aGlzIHJvbGVcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgICAgICAgLy8gVGFiIGVsZW1lbnRzIG11c3QgcmVmZXJlbmNlIHRoZSB1bmlxdWUgSUQgb2YgdGhlIHBhbmVsXG4gICAgICAgICAgLy8gdGhhdCB0aGV5IGNvbnRyb2xcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBwYW5lLmlkKTtcbiAgICAgICAgICAvLyBUYWIgZWxlbWVudHMgbXVzdCByZXBvcnQgdGhhdCB0aGV5IGFyZSBub3Qgc2VsZWN0ZWRcbiAgICAgICAgICAvLyBieSBkZWZhdWx0XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgLy8gUGFuZXMgbXVzdCB0YWtlIG9uIHRoZSBgVGFicGFuZWxgIHJvbGVcbiAgICAgICAgICBwYW5lLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgICAgICAgIC8vIEVsZW1lbnRzIHdpdGggdGFicGFuZWwgcm9sZSBtdXN0IGJlIGxhYmVsbGVkIGJ5XG4gICAgICAgICAgLy8gdGhlaXIgY29udHJvbGxpbmcgdGFiXG4gICAgICAgICAgcGFuZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGVsLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKHRhYkF0dHIpID09PSB0YWIpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBjdXJyZW50IHRhYi4gU3RvcmUgaXQuXG4gICAgICAgICAgY3VycmVudFRhYiA9IGVsO1xuICAgICAgICAgICRlbFxuICAgICAgICAgICAgLmFkZENsYXNzKGxpbmtDdXJyZW50KVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3RhYmluZGV4JylcbiAgICAgICAgICAgIC5hdHRyKHsnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJ30pXG4gICAgICAgICAgICAuZWFjaChpeC5pbnRybyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJGVsLmhhc0NsYXNzKGxpbmtDdXJyZW50KSkge1xuICAgICAgICAgICRlbFxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGxpbmtDdXJyZW50KVxuICAgICAgICAgICAgLmF0dHIoe3RhYmluZGV4OiAnLTEnLCAnYXJpYS1zZWxlY3RlZCc6ICdmYWxzZSd9KVxuICAgICAgICAgICAgLmVhY2goaXgub3V0cm8pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gRmluZCB0aGUgbmV3IHRhYiBwYW5lcyBhbmQga2VlcCB0cmFjayBvZiBwcmV2aW91c1xuICAgICAgdmFyIHRhcmdldHMgPSBbXTtcbiAgICAgIHZhciBwcmV2aW91cyA9IFtdO1xuICAgICAgZGF0YS5wYW5lcy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUodGFiQXR0cikgPT09IHRhYikge1xuICAgICAgICAgIHRhcmdldHMucHVzaChlbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJGVsLmhhc0NsYXNzKHRhYkFjdGl2ZSkpIHtcbiAgICAgICAgICBwcmV2aW91cy5wdXNoKGVsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciAkdGFyZ2V0cyA9ICQodGFyZ2V0cyk7XG4gICAgICB2YXIgJHByZXZpb3VzID0gJChwcmV2aW91cyk7XG5cbiAgICAgIC8vIFN3aXRjaCB0YWJzIGltbWVkaWF0ZWx5IGFuZCBieXBhc3MgdHJhbnNpdGlvbnNcbiAgICAgIGlmIChvcHRpb25zLmltbWVkaWF0ZSB8fCBjb25maWcuaW1tZWRpYXRlKSB7XG4gICAgICAgICR0YXJnZXRzLmFkZENsYXNzKHRhYkFjdGl2ZSkuZWFjaChpeC5pbnRybyk7XG4gICAgICAgICRwcmV2aW91cy5yZW1vdmVDbGFzcyh0YWJBY3RpdmUpO1xuICAgICAgICAvLyBSZWRyYXcgdG8gYmVuZWZpdCBjb21wb25lbnRzIGluIHRoZSBoaWRkZW4gdGFiIHBhbmVcbiAgICAgICAgLy8gQnV0IG9ubHkgaWYgbm90IGN1cnJlbnRseSBpbiB0aGUgbWlkZGxlIG9mIGEgcmVkcmF3XG4gICAgICAgIGlmICghaW5SZWRyYXcpIHtcbiAgICAgICAgICBXZWJmbG93LnJlZHJhdy51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIEZvY3VzIGlmIHRoaXMgaXMgbm90IHRoZSBvbi1wYWdlLWxvYWQgY2FsbCB0byBgY2hhbmdlVGFiYFxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIEJhY2t3YXJkcyBjb21wYXRpYmxlIGhhY2sgdG8gcHJldmVudCBmb2N1cyBmcm9tIHNjcm9sbGluZ1xuICAgICAgICB2YXIgeCA9IHdpbmRvdy5zY3JvbGxYO1xuICAgICAgICB2YXIgeSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBjdXJyZW50VGFiLmZvY3VzKCk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh4LCB5KTtcbiAgICAgIH1cblxuICAgICAgLy8gRmFkZSBvdXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiIGJlZm9yZSBpbnRyb1xuICAgICAgaWYgKCRwcmV2aW91cy5sZW5ndGggJiYgY29uZmlnLm91dHJvKSB7XG4gICAgICAgICRwcmV2aW91cy5lYWNoKGl4Lm91dHJvKTtcbiAgICAgICAgdHJhbSgkcHJldmlvdXMpXG4gICAgICAgICAgLmFkZCgnb3BhY2l0eSAnICsgY29uZmlnLm91dHJvICsgJ21zICcgKyBlYXNpbmcsIHtmYWxsYmFjazogc2FmYXJpfSlcbiAgICAgICAgICAuc3RhcnQoe29wYWNpdHk6IDB9KVxuICAgICAgICAgIC50aGVuKCgpID0+IGZhZGVJbihjb25maWcsICRwcmV2aW91cywgJHRhcmdldHMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNraXAgdGhlIG91dHJvIGFuZCBwbGF5IGludHJvXG4gICAgICAgIGZhZGVJbihjb25maWcsICRwcmV2aW91cywgJHRhcmdldHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZhZGUgaW4gdGhlIG5ldyB0YXJnZXRcbiAgICBmdW5jdGlvbiBmYWRlSW4oY29uZmlnLCAkcHJldmlvdXMsICR0YXJnZXRzKSB7XG4gICAgICAvLyBDbGVhciBwcmV2aW91cyBhY3RpdmUgY2xhc3MgKyBzdHlsZXMgdG91Y2hlZCBieSB0cmFtXG4gICAgICAvLyBXZSBjYW5ub3QgcmVtb3ZlIHRoZSB3aG9sZSBpbmxpbmUgc3R5bGUgYmVjYXVzZSBpdCBjb3VsZCBiZSBkeW5hbWljYWxseSBib3VuZFxuICAgICAgJHByZXZpb3VzLnJlbW92ZUNsYXNzKHRhYkFjdGl2ZSkuY3NzKHtcbiAgICAgICAgb3BhY2l0eTogJycsXG4gICAgICAgIHRyYW5zaXRpb246ICcnLFxuICAgICAgICB0cmFuc2Zvcm06ICcnLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIGhlaWdodDogJycsXG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBuZXcgdGFyZ2V0XG4gICAgICAkdGFyZ2V0cy5hZGRDbGFzcyh0YWJBY3RpdmUpLmVhY2goaXguaW50cm8pO1xuICAgICAgV2ViZmxvdy5yZWRyYXcudXAoKTtcblxuICAgICAgLy8gU2V0IG9wYWNpdHkgaW1tZWRpYXRlbHkgaWYgaW50cm8gaXMgemVyb1xuICAgICAgaWYgKCFjb25maWcuaW50cm8pIHtcbiAgICAgICAgcmV0dXJuIHRyYW0oJHRhcmdldHMpLnNldCh7b3BhY2l0eTogMX0pO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UgZmFkZSBpbiBvcGFjaXR5XG4gICAgICB0cmFtKCR0YXJnZXRzKVxuICAgICAgICAuc2V0KHtvcGFjaXR5OiAwfSlcbiAgICAgICAgLnJlZHJhdygpXG4gICAgICAgIC5hZGQoJ29wYWNpdHkgJyArIGNvbmZpZy5pbnRybyArICdtcyAnICsgY29uZmlnLmVhc2luZywge1xuICAgICAgICAgIGZhbGxiYWNrOiBzYWZhcmksXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCh7b3BhY2l0eTogMX0pO1xuICAgIH1cblxuICAgIC8vIEV4cG9ydCBtb2R1bGVcbiAgICByZXR1cm4gYXBpO1xuICB9KVxuKTtcbiJdLCJuYW1lcyI6WyJXZWJmbG93IiwicmVxdWlyZSIsIklYRXZlbnRzIiwiZGVmaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsIiQiLCJhcGkiLCJ0cmFtIiwiJGRvYyIsImRvY3VtZW50IiwiJHRhYnMiLCJkZXNpZ24iLCJlbnYiLCJzYWZhcmkiLCJpbkFwcCIsInRhYkF0dHIiLCJwYW5lQXR0ciIsIm5hbWVzcGFjZSIsImxpbmtDdXJyZW50IiwidGFiQWN0aXZlIiwiaXgiLCJ0cmlnZ2VycyIsImluUmVkcmF3IiwicmVhZHkiLCJwcmV2aWV3IiwiaW5pdCIsInJlZHJhdyIsImRlc3Ryb3kiLCJmaW5kIiwibGVuZ3RoIiwiZWFjaCIsInJlc2V0SVgiLCJyZW1vdmVMaXN0ZW5lcnMiLCJidWlsZCIsImFkZExpc3RlbmVycyIsIm9mZiIsIm9uIiwiaSIsImVsIiwiZGF0YSIsImxpbmtzIiwicmVzZXQiLCJwYW5lcyIsIndpZGdldEhhc2giLCJzdWJzdHIiLCIkZWwiLCJjb25maWciLCJjdXJyZW50IiwidGFiSWRlbnRpZmllciIsInBhbmVJZGVudGlmaWVyIiwibWVudSIsImNoaWxkcmVuIiwiY29udGVudCIsImF0dHIiLCJjb25maWd1cmUiLCJsaW5rU2VsZWN0IiwiaGFuZGxlTGlua0tleWRvd24iLCIkbGluayIsImZpbHRlciIsInRhYiIsImNoYW5nZVRhYiIsImltbWVkaWF0ZSIsImVhc2luZyIsImludHJvIiwicGFyc2VJbnQiLCJvdXRybyIsImdldEFjdGl2ZVRhYklkeCIsIkFycmF5IiwicHJvdG90eXBlIiwiZmluZEluZGV4IiwiY2FsbCIsInQiLCJnZXRBdHRyaWJ1dGUiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnRUYXJnZXQiLCJjdXJyZW50SWR4Iiwia2V5TmFtZSIsImtleSIsImtleU1hcCIsIkFycm93TGVmdCIsIkFycm93VXAiLCJBcnJvd1JpZ2h0IiwiQXJyb3dEb3duIiwiRW5kIiwiSG9tZSIsIm5leHRJZHgiLCJ0YWJFbCIsIm9wdGlvbnMiLCJjdXJyZW50VGFiIiwicGFuZSIsImlkIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImFkZENsYXNzIiwicmVtb3ZlQXR0ciIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0YWJpbmRleCIsInRhcmdldHMiLCJwcmV2aW91cyIsInB1c2giLCIkdGFyZ2V0cyIsIiRwcmV2aW91cyIsInVwIiwieCIsIndpbmRvdyIsInNjcm9sbFgiLCJ5Iiwic2Nyb2xsWSIsImZvY3VzIiwic2Nyb2xsVG8iLCJhZGQiLCJmYWxsYmFjayIsInN0YXJ0Iiwib3BhY2l0eSIsInRoZW4iLCJmYWRlSW4iLCJjc3MiLCJ0cmFuc2l0aW9uIiwidHJhbnNmb3JtIiwid2lk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

}),
"3487": (function (__unused_webpack_module, exports) {
"use strict";
// MIT License
//
// Copyright (c) 2020 Arjun Barrett
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    strFromU8: function() {
        return strFromU8;
    },
    unzip: function() {
        return unzip;
    }
});
const ch2 = {}, wk = function(c, id, msg, transfer, cb) {
    const w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], {
        type: "text/javascript"
    }))));
    return w.onmessage = function(e) {
        const d = e.data, ed = d.$e$;
        if (ed) {
            const err = new Error(ed[0]);
            err.code = ed[1], err.stack = ed[2], cb(err, null);
        } else cb(null, d);
    }, w.postMessage(msg, transfer), w;
}, u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array, fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    0,
    0,
    0
]), fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    0,
    0
]), clim = new u8([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]), freb = function(eb, start) {
    const b = new u16(31);
    for(var i = 0; i < 31; ++i)b[i] = start += 1 << eb[i - 1];
    const r = new u32(b[30]);
    for(i = 1; i < 30; ++i)for(let j = b[i]; j < b[i + 1]; ++j)r[j] = j - b[i] << 5 | i;
    return [
        b,
        r
    ];
}, _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
const _b = freb(fdeb, 0), fd = _b[0], rev = new u16(32768);
for(var i = 0; i < 32768; ++i){
    let x = (43690 & i) >>> 1 | (21845 & i) << 1;
    x = (52428 & x) >>> 2 | (13107 & x) << 2, x = (61680 & x) >>> 4 | (3855 & x) << 4, rev[i] = ((65280 & x) >>> 8 | (255 & x) << 8) >>> 1;
}
const hMap = function(cd, mb, r) {
    const s = cd.length;
    let i = 0;
    const l = new u16(mb);
    for(; i < s; ++i)cd[i] && ++l[cd[i] - 1];
    const le = new u16(mb);
    for(i = 0; i < mb; ++i)le[i] = le[i - 1] + l[i - 1] << 1;
    let co;
    if (r) {
        co = new u16(1 << mb);
        const rvb = 15 - mb;
        for(i = 0; i < s; ++i)if (cd[i]) {
            const sv = i << 4 | cd[i], r_1 = mb - cd[i];
            let v = le[cd[i] - 1]++ << r_1;
            for(let m = v | (1 << r_1) - 1; v <= m; ++v)co[rev[v] >>> rvb] = sv;
        }
    } else for(co = new u16(s), i = 0; i < s; ++i)cd[i] && (co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i]);
    return co;
}, flt = new u8(288);
for(i = 0; i < 144; ++i)flt[i] = 8;
for(i = 144; i < 256; ++i)flt[i] = 9;
for(i = 256; i < 280; ++i)flt[i] = 7;
for(i = 280; i < 288; ++i)flt[i] = 8;
const fdt = new u8(32);
for(i = 0; i < 32; ++i)fdt[i] = 5;
const flrm = hMap(flt, 9, 1), fdrm = hMap(fdt, 5, 1), max = function(a) {
    let m = a[0];
    for(let i = 1; i < a.length; ++i)a[i] > m && (m = a[i]);
    return m;
}, bits = function(d, p, m) {
    const o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (7 & p) & m;
}, bits16 = function(d, p) {
    const o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (7 & p);
}, shft = function(p) {
    return (p + 7) / 8 | 0;
}, slc = function(v, s, e) {
    (null == s || s < 0) && (s = 0), (null == e || e > v.length) && (e = v.length);
    const n = new (2 === v.BYTES_PER_ELEMENT ? u16 : 4 === v.BYTES_PER_ELEMENT ? u32 : u8)(e - s);
    return n.set(v.subarray(s, e)), n;
}, ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
];
var err = function(ind, msg, nt) {
    const e = new Error(msg || ec[ind]);
    if (e.code = ind, Error.captureStackTrace && Error.captureStackTrace(e, err), !nt) throw e;
    return e;
};
const inflt = function(dat, buf, st) {
    const sl = dat.length;
    if (!sl || st && st.f && !st.l) return buf || new u8(0);
    const noBuf = !buf || st, noSt = !st || st.i;
    st || (st = {}), buf || (buf = new u8(3 * sl));
    const cbuf = function(l) {
        const bl = buf.length;
        if (l > bl) {
            const nbuf = new u8(Math.max(2 * bl, l));
            nbuf.set(buf), buf = nbuf;
        }
    };
    let final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    const tbts = 8 * sl;
    do {
        if (!lm) {
            final = bits(dat, pos, 1);
            const type = bits(dat, pos + 1, 3);
            if (pos += 3, !type) {
                const l = dat[(s = shft(pos) + 4) - 4] | dat[s - 3] << 8, t = s + l;
                if (t > sl) {
                    noSt && err(0);
                    break;
                }
                noBuf && cbuf(bt + l), buf.set(dat.subarray(s, t), bt), st.b = bt += l, st.p = pos = 8 * t, st.f = final;
                continue;
            }
            if (1 === type) lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (2 === type) {
                const hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4, tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                const ldt = new u8(tl), clt = new u8(19);
                for(var i = 0; i < hcLen; ++i)clt[clim[i]] = bits(dat, pos + 3 * i, 7);
                pos += 3 * hcLen;
                const clb = max(clt), clbmsk = (1 << clb) - 1, clm = hMap(clt, clb, 1);
                for(i = 0; i < tl;){
                    const r = clm[bits(dat, pos, clbmsk)];
                    var s;
                    if (pos += 15 & r, (s = r >>> 4) < 16) ldt[i++] = s;
                    else {
                        var c = 0;
                        let n = 0;
                        for(16 === s ? (n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1]) : 17 === s ? (n = 3 + bits(dat, pos, 7), pos += 3) : 18 === s && (n = 11 + bits(dat, pos, 127), pos += 7); n--;)ldt[i++] = c;
                    }
                }
                const lt = ldt.subarray(0, hLit);
                var dt = ldt.subarray(hLit);
                lbt = max(lt), dbt = max(dt), lm = hMap(lt, lbt, 1), dm = hMap(dt, dbt, 1);
            } else err(1);
            if (pos > tbts) {
                noSt && err(0);
                break;
            }
        }
        noBuf && cbuf(bt + 131072);
        const lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        let lpos = pos;
        for(;; lpos = pos){
            const sym = (c = lm[bits16(dat, pos) & lms]) >>> 4;
            if (pos += 15 & c, pos > tbts) {
                noSt && err(0);
                break;
            }
            if (c || err(2), sym < 256) buf[bt++] = sym;
            else {
                if (256 === sym) {
                    lpos = pos, lm = null;
                    break;
                }
                {
                    let add = sym - 254;
                    if (sym > 264) {
                        var b = fleb[i = sym - 257];
                        add = bits(dat, pos, (1 << b) - 1) + fl[i], pos += b;
                    }
                    const d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                    d || err(3), pos += 15 & d;
                    dt = fd[dsym];
                    if (dsym > 3) {
                        b = fdeb[dsym];
                        dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
                    }
                    if (pos > tbts) {
                        noSt && err(0);
                        break;
                    }
                    noBuf && cbuf(bt + 131072);
                    const end = bt + add;
                    for(; bt < end; bt += 4)buf[bt] = buf[bt - dt], buf[bt + 1] = buf[bt + 1 - dt], buf[bt + 2] = buf[bt + 2 - dt], buf[bt + 3] = buf[bt + 3 - dt];
                    bt = end;
                }
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final, lm && (final = 1, st.m = lbt, st.d = dm, st.n = dbt);
    }while (!final);
    return bt === buf.length ? buf : slc(buf, 0, bt);
}, mrg = function(a, b) {
    const o = {};
    for(var k in a)o[k] = a[k];
    for(var k in b)o[k] = b[k];
    return o;
}, wcln = function(fn, fnStr, td) {
    const dt = fn(), st = fn.toString(), ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
    for(let i = 0; i < dt.length; ++i){
        const v = dt[i], k = ks[i];
        if ("function" == typeof v) {
            fnStr += ";" + k + "=";
            const st_1 = v.toString();
            if (v.prototype) if (-1 !== st_1.indexOf("[native code]")) {
                const spInd = st_1.indexOf(" ", 8) + 1;
                fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
            } else {
                fnStr += st_1;
                for(const t in v.prototype)fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
            }
            else fnStr += st_1;
        } else td[k] = v;
    }
    return [
        fnStr,
        td
    ];
}, ch = [], cbfs = function(v) {
    const tl = [];
    for(const k in v)v[k].buffer && tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    return tl;
}, wrkr = function(fns, init, id, cb) {
    let _a;
    if (!ch[id]) {
        let fnStr = "", td_1 = {};
        const m = fns.length - 1;
        for(let i = 0; i < m; ++i)_a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    const td = mrg({}, ch[id][1]);
    return wk(ch[id][0] + ";onmessage=function(e){for(var kz in e.data)self[kz]=e.data[kz];onmessage=" + init.toString() + "}", id, td, cbfs(td), cb);
}, bInflt = function() {
    return [
        u8,
        u16,
        u32,
        fleb,
        fdeb,
        clim,
        fl,
        fd,
        flrm,
        fdrm,
        rev,
        ec,
        hMap,
        max,
        bits,
        bits16,
        shft,
        slc,
        err,
        inflt,
        inflateSync,
        pbf,
        gu8
    ];
};
var pbf = function(msg) {
    return postMessage(msg, [
        msg.buffer
    ]);
}, gu8 = function(o) {
    return o && o.size && new u8(o.size);
};
const cbify = function(dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function(err, dat) {
        w.terminate(), cb(err, dat);
    });
    return w.postMessage([
        dat,
        opts
    ], opts.consume ? [
        dat.buffer
    ] : []), function() {
        w.terminate();
    };
}, b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
}, b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
function inflate(data, opts, cb) {
    return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [
        bInflt
    ], function(ev) {
        return pbf(inflateSync(ev.data[0], gu8(ev.data[1])));
    }, 1, cb);
}
function inflateSync(data, out) {
    return inflt(data, out);
}
const td = "undefined" != typeof TextDecoder && new TextDecoder, dutf8 = function(d) {
    for(let r = "", i = 0;;){
        let c = d[i++];
        const eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length) return [
            r,
            slc(d, i - 1)
        ];
        eb ? 3 === eb ? (c = ((15 & c) << 18 | (63 & d[i++]) << 12 | (63 & d[i++]) << 6 | 63 & d[i++]) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)) : r += 1 & eb ? String.fromCharCode((31 & c) << 6 | 63 & d[i++]) : String.fromCharCode((15 & c) << 12 | (63 & d[i++]) << 6 | 63 & d[i++]) : r += String.fromCharCode(c);
    }
};
function strFromU8(dat, latin1) {
    if (latin1) {
        let r = "";
        for(let i = 0; i < dat.length; i += 16384)r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    }
    if (td) return td.decode(dat);
    {
        const _a = dutf8(dat), out = _a[0];
        return _a[1].length && err(8), out;
    }
}
const slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
}, zh = function(d, b, z) {
    const fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(2048 & b2(d, b + 8))), es = b + 46 + fnl, bs = b4(d, b + 20), _a = z && 4294967295 === bs ? z64e(d, es) : [
        bs,
        b4(d, b + 24),
        b4(d, b + 42)
    ], sc = _a[0], su = _a[1], off = _a[2];
    return [
        b2(d, b + 10),
        sc,
        su,
        fn,
        es + b2(d, b + 30) + b2(d, b + 32),
        off
    ];
}, mt = "function" == typeof queueMicrotask ? queueMicrotask : "function" == typeof setTimeout ? setTimeout : function(fn) {
    fn();
};
function unzip(data, opts, cb) {
    cb || (cb = opts, opts = {}), "function" != typeof cb && err(7);
    const term = [], tAll = function() {
        for(let i = 0; i < term.length; ++i)term[i]();
    }, files = {};
    let cbd = function(a, b) {
        mt(function() {
            cb(a, b);
        });
    };
    mt(function() {
        cbd = cb;
    });
    let e = data.length - 22;
    for(; 101010256 !== b4(data, e); --e)if (!e || data.length - e > 65558) return cbd(err(13, 0, 1), null), tAll;
    let lft = b2(data, e + 8);
    if (lft) {
        let c = lft, o = b4(data, e + 16), z = 4294967295 === o || 65535 === c;
        if (z) {
            const ze = b4(data, e - 12);
            z = 101075792 === b4(data, ze), z && (c = lft = b4(data, ze + 32), o = b4(data, ze + 48));
        }
        const fltr = opts && opts.filter, _loop_3 = function() {
            const _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
            o = no;
            const cbl = function(e, d) {
                e ? (tAll(), cbd(e, null)) : (d && (files[fn] = d), --lft || cbd(null, files));
            };
            if (!fltr || fltr({
                name: fn,
                size: sc,
                originalSize: su,
                compression: c_1
            })) if (c_1) if (8 === c_1) {
                const infl = data.subarray(b, b + sc);
                if (sc < 32e4) try {
                    cbl(null, inflateSync(infl, new u8(su)));
                } catch (e) {
                    cbl(e, null);
                }
                else term.push(inflate(infl, {
                    size: su
                }, cbl));
            } else cbl(err(14, "unknown compression type " + c_1, 1), null);
            else cbl(null, slc(data, b, b + sc));
            else cbl(null, null);
        };
        for(let i = 0; i < c; ++i)_loop_3(i);
    } else cbd(null, {});
    return tAll;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZmbGF0ZS5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBNSVQgTGljZW5zZVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyMCBBcmp1biBCYXJyZXR0XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4vLyBTT0ZUV0FSRS5cbiAgY29uc3QgY2gyPXt9LHdrPWZ1bmN0aW9uKGMsaWQsbXNnLHRyYW5zZmVyLGNiKXtjb25zdCB3PW5ldyBXb3JrZXIoY2gyW2lkXXx8KGNoMltpZF09VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYysnO2FkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGZ1bmN0aW9uKGUpe2U9ZS5lcnJvcjtwb3N0TWVzc2FnZSh7JGUkOltlLm1lc3NhZ2UsZS5jb2RlLGUuc3RhY2tdfSl9KSddLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSkpKTtyZXR1cm4gdy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7Y29uc3QgZD1lLmRhdGEsZWQ9ZC4kZSQ7aWYoZWQpe2NvbnN0IGVycj1uZXcgRXJyb3IoZWRbMF0pO2Vyci5jb2RlPWVkWzFdLGVyci5zdGFjaz1lZFsyXSxjYihlcnIsbnVsbCl9ZWxzZSBjYihudWxsLGQpfSx3LnBvc3RNZXNzYWdlKG1zZyx0cmFuc2Zlciksd30sdTg9VWludDhBcnJheSx1MTY9VWludDE2QXJyYXksdTMyPVVpbnQzMkFycmF5LGZsZWI9bmV3IHU4KFswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywzLDMsNCw0LDQsNCw1LDUsNSw1LDAsMCwwLDBdKSxmZGViPW5ldyB1OChbMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxMywwLDBdKSxjbGltPW5ldyB1OChbMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0pLGZyZWI9ZnVuY3Rpb24oZWIsc3RhcnQpe2NvbnN0IGI9bmV3IHUxNigzMSk7Zm9yKHZhciBpPTA7aTwzMTsrK2kpYltpXT1zdGFydCs9MTw8ZWJbaS0xXTtjb25zdCByPW5ldyB1MzIoYlszMF0pO2ZvcihpPTE7aTwzMDsrK2kpZm9yKGxldCBqPWJbaV07ajxiW2krMV07KytqKXJbal09ai1iW2ldPDw1fGk7cmV0dXJuW2Iscl19LF9hPWZyZWIoZmxlYiwyKSxmbD1fYVswXSxyZXZmbD1fYVsxXTtmbFsyOF09MjU4LHJldmZsWzI1OF09Mjg7Y29uc3QgX2I9ZnJlYihmZGViLDApLGZkPV9iWzBdLHJldj1uZXcgdTE2KDMyNzY4KTtmb3IodmFyIGk9MDtpPDMyNzY4OysraSl7bGV0IHg9KDQzNjkwJmkpPj4+MXwoMjE4NDUmaSk8PDE7eD0oNTI0MjgmeCk+Pj4yfCgxMzEwNyZ4KTw8Mix4PSg2MTY4MCZ4KT4+PjR8KDM4NTUmeCk8PDQscmV2W2ldPSgoNjUyODAmeCk+Pj44fCgyNTUmeCk8PDgpPj4+MX1jb25zdCBoTWFwPWZ1bmN0aW9uKGNkLG1iLHIpe2NvbnN0IHM9Y2QubGVuZ3RoO2xldCBpPTA7Y29uc3QgbD1uZXcgdTE2KG1iKTtmb3IoO2k8czsrK2kpY2RbaV0mJisrbFtjZFtpXS0xXTtjb25zdCBsZT1uZXcgdTE2KG1iKTtmb3IoaT0wO2k8bWI7KytpKWxlW2ldPWxlW2ktMV0rbFtpLTFdPDwxO2xldCBjbztpZihyKXtjbz1uZXcgdTE2KDE8PG1iKTtjb25zdCBydmI9MTUtbWI7Zm9yKGk9MDtpPHM7KytpKWlmKGNkW2ldKXtjb25zdCBzdj1pPDw0fGNkW2ldLHJfMT1tYi1jZFtpXTtsZXQgdj1sZVtjZFtpXS0xXSsrPDxyXzE7Zm9yKGxldCBtPXZ8KDE8PHJfMSktMTt2PD1tOysrdiljb1tyZXZbdl0+Pj5ydmJdPXN2fX1lbHNlIGZvcihjbz1uZXcgdTE2KHMpLGk9MDtpPHM7KytpKWNkW2ldJiYoY29baV09cmV2W2xlW2NkW2ldLTFdKytdPj4+MTUtY2RbaV0pO3JldHVybiBjb30sZmx0PW5ldyB1OCgyODgpO2ZvcihpPTA7aTwxNDQ7KytpKWZsdFtpXT04O2ZvcihpPTE0NDtpPDI1NjsrK2kpZmx0W2ldPTk7Zm9yKGk9MjU2O2k8MjgwOysraSlmbHRbaV09Nztmb3IoaT0yODA7aTwyODg7KytpKWZsdFtpXT04O2NvbnN0IGZkdD1uZXcgdTgoMzIpO2ZvcihpPTA7aTwzMjsrK2kpZmR0W2ldPTU7Y29uc3QgZmxybT1oTWFwKGZsdCw5LDEpLGZkcm09aE1hcChmZHQsNSwxKSxtYXg9ZnVuY3Rpb24oYSl7bGV0IG09YVswXTtmb3IobGV0IGk9MTtpPGEubGVuZ3RoOysraSlhW2ldPm0mJihtPWFbaV0pO3JldHVybiBtfSxiaXRzPWZ1bmN0aW9uKGQscCxtKXtjb25zdCBvPXAvOHwwO3JldHVybihkW29dfGRbbysxXTw8OCk+Pig3JnApJm19LGJpdHMxNj1mdW5jdGlvbihkLHApe2NvbnN0IG89cC84fDA7cmV0dXJuKGRbb118ZFtvKzFdPDw4fGRbbysyXTw8MTYpPj4oNyZwKX0sc2hmdD1mdW5jdGlvbihwKXtyZXR1cm4ocCs3KS84fDB9LHNsYz1mdW5jdGlvbih2LHMsZSl7KG51bGw9PXN8fHM8MCkmJihzPTApLChudWxsPT1lfHxlPnYubGVuZ3RoKSYmKGU9di5sZW5ndGgpO2NvbnN0IG49bmV3KDI9PT12LkJZVEVTX1BFUl9FTEVNRU5UP3UxNjo0PT09di5CWVRFU19QRVJfRUxFTUVOVD91MzI6dTgpKGUtcyk7cmV0dXJuIG4uc2V0KHYuc3ViYXJyYXkocyxlKSksbn0sZWM9W1widW5leHBlY3RlZCBFT0ZcIixcImludmFsaWQgYmxvY2sgdHlwZVwiLFwiaW52YWxpZCBsZW5ndGgvbGl0ZXJhbFwiLFwiaW52YWxpZCBkaXN0YW5jZVwiLFwic3RyZWFtIGZpbmlzaGVkXCIsXCJubyBzdHJlYW0gaGFuZGxlclwiLCxcIm5vIGNhbGxiYWNrXCIsXCJpbnZhbGlkIFVURi04IGRhdGFcIixcImV4dHJhIGZpZWxkIHRvbyBsb25nXCIsXCJkYXRlIG5vdCBpbiByYW5nZSAxOTgwLTIwOTlcIixcImZpbGVuYW1lIHRvbyBsb25nXCIsXCJzdHJlYW0gZmluaXNoaW5nXCIsXCJpbnZhbGlkIHppcCBkYXRhXCJdO3ZhciBlcnI9ZnVuY3Rpb24oaW5kLG1zZyxudCl7Y29uc3QgZT1uZXcgRXJyb3IobXNnfHxlY1tpbmRdKTtpZihlLmNvZGU9aW5kLEVycm9yLmNhcHR1cmVTdGFja1RyYWNlJiZFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlLGVyciksIW50KXRocm93IGU7cmV0dXJuIGV9O2NvbnN0IGluZmx0PWZ1bmN0aW9uKGRhdCxidWYsc3Qpe2NvbnN0IHNsPWRhdC5sZW5ndGg7aWYoIXNsfHxzdCYmc3QuZiYmIXN0LmwpcmV0dXJuIGJ1Znx8bmV3IHU4KDApO2NvbnN0IG5vQnVmPSFidWZ8fHN0LG5vU3Q9IXN0fHxzdC5pO3N0fHwoc3Q9e30pLGJ1Znx8KGJ1Zj1uZXcgdTgoMypzbCkpO2NvbnN0IGNidWY9ZnVuY3Rpb24obCl7Y29uc3QgYmw9YnVmLmxlbmd0aDtpZihsPmJsKXtjb25zdCBuYnVmPW5ldyB1OChNYXRoLm1heCgyKmJsLGwpKTtuYnVmLnNldChidWYpLGJ1Zj1uYnVmfX07bGV0IGZpbmFsPXN0LmZ8fDAscG9zPXN0LnB8fDAsYnQ9c3QuYnx8MCxsbT1zdC5sLGRtPXN0LmQsbGJ0PXN0Lm0sZGJ0PXN0Lm47Y29uc3QgdGJ0cz04KnNsO2Rve2lmKCFsbSl7ZmluYWw9Yml0cyhkYXQscG9zLDEpO2NvbnN0IHR5cGU9Yml0cyhkYXQscG9zKzEsMyk7aWYocG9zKz0zLCF0eXBlKXtjb25zdCBsPWRhdFsocz1zaGZ0KHBvcykrNCktNF18ZGF0W3MtM108PDgsdD1zK2w7aWYodD5zbCl7bm9TdCYmZXJyKDApO2JyZWFrfW5vQnVmJiZjYnVmKGJ0K2wpLGJ1Zi5zZXQoZGF0LnN1YmFycmF5KHMsdCksYnQpLHN0LmI9YnQrPWwsc3QucD1wb3M9OCp0LHN0LmY9ZmluYWw7Y29udGludWV9aWYoMT09PXR5cGUpbG09ZmxybSxkbT1mZHJtLGxidD05LGRidD01O2Vsc2UgaWYoMj09PXR5cGUpe2NvbnN0IGhMaXQ9Yml0cyhkYXQscG9zLDMxKSsyNTcsaGNMZW49Yml0cyhkYXQscG9zKzEwLDE1KSs0LHRsPWhMaXQrYml0cyhkYXQscG9zKzUsMzEpKzE7cG9zKz0xNDtjb25zdCBsZHQ9bmV3IHU4KHRsKSxjbHQ9bmV3IHU4KDE5KTtmb3IodmFyIGk9MDtpPGhjTGVuOysraSljbHRbY2xpbVtpXV09Yml0cyhkYXQscG9zKzMqaSw3KTtwb3MrPTMqaGNMZW47Y29uc3QgY2xiPW1heChjbHQpLGNsYm1zaz0oMTw8Y2xiKS0xLGNsbT1oTWFwKGNsdCxjbGIsMSk7Zm9yKGk9MDtpPHRsOyl7Y29uc3Qgcj1jbG1bYml0cyhkYXQscG9zLGNsYm1zayldO3ZhciBzO2lmKHBvcys9MTUmciwocz1yPj4+NCk8MTYpbGR0W2krK109cztlbHNle3ZhciBjPTA7bGV0IG49MDtmb3IoMTY9PT1zPyhuPTMrYml0cyhkYXQscG9zLDMpLHBvcys9MixjPWxkdFtpLTFdKToxNz09PXM/KG49MytiaXRzKGRhdCxwb3MsNykscG9zKz0zKToxOD09PXMmJihuPTExK2JpdHMoZGF0LHBvcywxMjcpLHBvcys9Nyk7bi0tOylsZHRbaSsrXT1jfX1jb25zdCBsdD1sZHQuc3ViYXJyYXkoMCxoTGl0KTt2YXIgZHQ9bGR0LnN1YmFycmF5KGhMaXQpO2xidD1tYXgobHQpLGRidD1tYXgoZHQpLGxtPWhNYXAobHQsbGJ0LDEpLGRtPWhNYXAoZHQsZGJ0LDEpfWVsc2UgZXJyKDEpO2lmKHBvcz50YnRzKXtub1N0JiZlcnIoMCk7YnJlYWt9fW5vQnVmJiZjYnVmKGJ0KzEzMTA3Mik7Y29uc3QgbG1zPSgxPDxsYnQpLTEsZG1zPSgxPDxkYnQpLTE7bGV0IGxwb3M9cG9zO2Zvcig7O2xwb3M9cG9zKXtjb25zdCBzeW09KGM9bG1bYml0czE2KGRhdCxwb3MpJmxtc10pPj4+NDtpZihwb3MrPTE1JmMscG9zPnRidHMpe25vU3QmJmVycigwKTticmVha31pZihjfHxlcnIoMiksc3ltPDI1NilidWZbYnQrK109c3ltO2Vsc2V7aWYoMjU2PT09c3ltKXtscG9zPXBvcyxsbT1udWxsO2JyZWFrfXtsZXQgYWRkPXN5bS0yNTQ7aWYoc3ltPjI2NCl7dmFyIGI9ZmxlYltpPXN5bS0yNTddO2FkZD1iaXRzKGRhdCxwb3MsKDE8PGIpLTEpK2ZsW2ldLHBvcys9Yn1jb25zdCBkPWRtW2JpdHMxNihkYXQscG9zKSZkbXNdLGRzeW09ZD4+PjQ7ZHx8ZXJyKDMpLHBvcys9MTUmZDtkdD1mZFtkc3ltXTtpZihkc3ltPjMpe2I9ZmRlYltkc3ltXTtkdCs9Yml0czE2KGRhdCxwb3MpJigxPDxiKS0xLHBvcys9Yn1pZihwb3M+dGJ0cyl7bm9TdCYmZXJyKDApO2JyZWFrfW5vQnVmJiZjYnVmKGJ0KzEzMTA3Mik7Y29uc3QgZW5kPWJ0K2FkZDtmb3IoO2J0PGVuZDtidCs9NClidWZbYnRdPWJ1ZltidC1kdF0sYnVmW2J0KzFdPWJ1ZltidCsxLWR0XSxidWZbYnQrMl09YnVmW2J0KzItZHRdLGJ1ZltidCszXT1idWZbYnQrMy1kdF07YnQ9ZW5kfX19c3QubD1sbSxzdC5wPWxwb3Msc3QuYj1idCxzdC5mPWZpbmFsLGxtJiYoZmluYWw9MSxzdC5tPWxidCxzdC5kPWRtLHN0Lm49ZGJ0KX13aGlsZSghZmluYWwpO3JldHVybiBidD09PWJ1Zi5sZW5ndGg/YnVmOnNsYyhidWYsMCxidCl9LG1yZz1mdW5jdGlvbihhLGIpe2NvbnN0IG89e307Zm9yKHZhciBrIGluIGEpb1trXT1hW2tdO2Zvcih2YXIgayBpbiBiKW9ba109YltrXTtyZXR1cm4gb30sd2Nsbj1mdW5jdGlvbihmbixmblN0cix0ZCl7Y29uc3QgZHQ9Zm4oKSxzdD1mbi50b1N0cmluZygpLGtzPXN0LnNsaWNlKHN0LmluZGV4T2YoXCJbXCIpKzEsc3QubGFzdEluZGV4T2YoXCJdXCIpKS5yZXBsYWNlKC9cXHMrL2csXCJcIikuc3BsaXQoXCIsXCIpO2ZvcihsZXQgaT0wO2k8ZHQubGVuZ3RoOysraSl7Y29uc3Qgdj1kdFtpXSxrPWtzW2ldO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHYpe2ZuU3RyKz1cIjtcIitrK1wiPVwiO2NvbnN0IHN0XzE9di50b1N0cmluZygpO2lmKHYucHJvdG90eXBlKWlmKC0xIT09c3RfMS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSl7Y29uc3Qgc3BJbmQ9c3RfMS5pbmRleE9mKFwiIFwiLDgpKzE7Zm5TdHIrPXN0XzEuc2xpY2Uoc3BJbmQsc3RfMS5pbmRleE9mKFwiKFwiLHNwSW5kKSl9ZWxzZXtmblN0cis9c3RfMTtmb3IoY29uc3QgdCBpbiB2LnByb3RvdHlwZSlmblN0cis9XCI7XCIraytcIi5wcm90b3R5cGUuXCIrdCtcIj1cIit2LnByb3RvdHlwZVt0XS50b1N0cmluZygpfWVsc2UgZm5TdHIrPXN0XzF9ZWxzZSB0ZFtrXT12fXJldHVybltmblN0cix0ZF19LGNoPVtdLGNiZnM9ZnVuY3Rpb24odil7Y29uc3QgdGw9W107Zm9yKGNvbnN0IGsgaW4gdil2W2tdLmJ1ZmZlciYmdGwucHVzaCgodltrXT1uZXcgdltrXS5jb25zdHJ1Y3Rvcih2W2tdKSkuYnVmZmVyKTtyZXR1cm4gdGx9LHdya3I9ZnVuY3Rpb24oZm5zLGluaXQsaWQsY2Ipe2xldCBfYTtpZighY2hbaWRdKXtsZXQgZm5TdHI9XCJcIix0ZF8xPXt9O2NvbnN0IG09Zm5zLmxlbmd0aC0xO2ZvcihsZXQgaT0wO2k8bTsrK2kpX2E9d2NsbihmbnNbaV0sZm5TdHIsdGRfMSksZm5TdHI9X2FbMF0sdGRfMT1fYVsxXTtjaFtpZF09d2NsbihmbnNbbV0sZm5TdHIsdGRfMSl9Y29uc3QgdGQ9bXJnKHt9LGNoW2lkXVsxXSk7cmV0dXJuIHdrKGNoW2lkXVswXStcIjtvbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciBreiBpbiBlLmRhdGEpc2VsZltrel09ZS5kYXRhW2t6XTtvbm1lc3NhZ2U9XCIraW5pdC50b1N0cmluZygpK1wifVwiLGlkLHRkLGNiZnModGQpLGNiKX0sYkluZmx0PWZ1bmN0aW9uKCl7cmV0dXJuW3U4LHUxNix1MzIsZmxlYixmZGViLGNsaW0sZmwsZmQsZmxybSxmZHJtLHJldixlYyxoTWFwLG1heCxiaXRzLGJpdHMxNixzaGZ0LHNsYyxlcnIsaW5mbHQsaW5mbGF0ZVN5bmMscGJmLGd1OF19O3ZhciBwYmY9ZnVuY3Rpb24obXNnKXtyZXR1cm4gcG9zdE1lc3NhZ2UobXNnLFttc2cuYnVmZmVyXSl9LGd1OD1mdW5jdGlvbihvKXtyZXR1cm4gbyYmby5zaXplJiZuZXcgdTgoby5zaXplKX07Y29uc3QgY2JpZnk9ZnVuY3Rpb24oZGF0LG9wdHMsZm5zLGluaXQsaWQsY2Ipe3ZhciB3PXdya3IoZm5zLGluaXQsaWQsKGZ1bmN0aW9uKGVycixkYXQpe3cudGVybWluYXRlKCksY2IoZXJyLGRhdCl9KSk7cmV0dXJuIHcucG9zdE1lc3NhZ2UoW2RhdCxvcHRzXSxvcHRzLmNvbnN1bWU/W2RhdC5idWZmZXJdOltdKSxmdW5jdGlvbigpe3cudGVybWluYXRlKCl9fSxiMj1mdW5jdGlvbihkLGIpe3JldHVybiBkW2JdfGRbYisxXTw8OH0sYjQ9ZnVuY3Rpb24oZCxiKXtyZXR1cm4oZFtiXXxkW2IrMV08PDh8ZFtiKzJdPDwxNnxkW2IrM108PDI0KT4+PjB9O2Z1bmN0aW9uIGluZmxhdGUoZGF0YSxvcHRzLGNiKXtyZXR1cm4gY2J8fChjYj1vcHRzLG9wdHM9e30pLFwiZnVuY3Rpb25cIiE9dHlwZW9mIGNiJiZlcnIoNyksY2JpZnkoZGF0YSxvcHRzLFtiSW5mbHRdLChmdW5jdGlvbihldil7cmV0dXJuIHBiZihpbmZsYXRlU3luYyhldi5kYXRhWzBdLGd1OChldi5kYXRhWzFdKSkpfSksMSxjYil9ZnVuY3Rpb24gaW5mbGF0ZVN5bmMoZGF0YSxvdXQpe3JldHVybiBpbmZsdChkYXRhLG91dCl9Y29uc3QgdGQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFRleHREZWNvZGVyJiZuZXcgVGV4dERlY29kZXIsZHV0Zjg9ZnVuY3Rpb24oZCl7Zm9yKGxldCByPVwiXCIsaT0wOzspe2xldCBjPWRbaSsrXTtjb25zdCBlYj0oYz4xMjcpKyhjPjIyMykrKGM+MjM5KTtpZihpK2ViPmQubGVuZ3RoKXJldHVybltyLHNsYyhkLGktMSldO2ViPzM9PT1lYj8oYz0oKDE1JmMpPDwxOHwoNjMmZFtpKytdKTw8MTJ8KDYzJmRbaSsrXSk8PDZ8NjMmZFtpKytdKS02NTUzNixyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGM+PjEwLDU2MzIwfDEwMjMmYykpOnIrPTEmZWI/U3RyaW5nLmZyb21DaGFyQ29kZSgoMzEmYyk8PDZ8NjMmZFtpKytdKTpTdHJpbmcuZnJvbUNoYXJDb2RlKCgxNSZjKTw8MTJ8KDYzJmRbaSsrXSk8PDZ8NjMmZFtpKytdKTpyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGMpfX07ZXhwb3J0IGZ1bmN0aW9uIHN0ckZyb21VOChkYXQsbGF0aW4xKXtpZihsYXRpbjEpe2xldCByPVwiXCI7Zm9yKGxldCBpPTA7aTxkYXQubGVuZ3RoO2krPTE2Mzg0KXIrPVN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxkYXQuc3ViYXJyYXkoaSxpKzE2Mzg0KSk7cmV0dXJuIHJ9aWYodGQpcmV0dXJuIHRkLmRlY29kZShkYXQpO3tjb25zdCBfYT1kdXRmOChkYXQpLG91dD1fYVswXTtyZXR1cm4gX2FbMV0ubGVuZ3RoJiZlcnIoOCksb3V0fX1jb25zdCBzbHpoPWZ1bmN0aW9uKGQsYil7cmV0dXJuIGIrMzArYjIoZCxiKzI2KStiMihkLGIrMjgpfSx6aD1mdW5jdGlvbihkLGIseil7Y29uc3QgZm5sPWIyKGQsYisyOCksZm49c3RyRnJvbVU4KGQuc3ViYXJyYXkoYis0NixiKzQ2K2ZubCksISgyMDQ4JmIyKGQsYis4KSkpLGVzPWIrNDYrZm5sLGJzPWI0KGQsYisyMCksX2E9eiYmNDI5NDk2NzI5NT09PWJzP3o2NGUoZCxlcyk6W2JzLGI0KGQsYisyNCksYjQoZCxiKzQyKV0sc2M9X2FbMF0sc3U9X2FbMV0sb2ZmPV9hWzJdO3JldHVybltiMihkLGIrMTApLHNjLHN1LGZuLGVzK2IyKGQsYiszMCkrYjIoZCxiKzMyKSxvZmZdfSxtdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBxdWV1ZU1pY3JvdGFzaz9xdWV1ZU1pY3JvdGFzazpcImZ1bmN0aW9uXCI9PXR5cGVvZiBzZXRUaW1lb3V0P3NldFRpbWVvdXQ6ZnVuY3Rpb24oZm4pe2ZuKCl9O2V4cG9ydCBmdW5jdGlvbiB1bnppcChkYXRhLG9wdHMsY2Ipe2NifHwoY2I9b3B0cyxvcHRzPXt9KSxcImZ1bmN0aW9uXCIhPXR5cGVvZiBjYiYmZXJyKDcpO2NvbnN0IHRlcm09W10sdEFsbD1mdW5jdGlvbigpe2ZvcihsZXQgaT0wO2k8dGVybS5sZW5ndGg7KytpKXRlcm1baV0oKX0sZmlsZXM9e307bGV0IGNiZD1mdW5jdGlvbihhLGIpe210KChmdW5jdGlvbigpe2NiKGEsYil9KSl9O210KChmdW5jdGlvbigpe2NiZD1jYn0pKTtsZXQgZT1kYXRhLmxlbmd0aC0yMjtmb3IoOzEwMTAxMDI1NiE9PWI0KGRhdGEsZSk7LS1lKWlmKCFlfHxkYXRhLmxlbmd0aC1lPjY1NTU4KXJldHVybiBjYmQoZXJyKDEzLDAsMSksbnVsbCksdEFsbDtsZXQgbGZ0PWIyKGRhdGEsZSs4KTtpZihsZnQpe2xldCBjPWxmdCxvPWI0KGRhdGEsZSsxNiksej00Mjk0OTY3Mjk1PT09b3x8NjU1MzU9PT1jO2lmKHope2NvbnN0IHplPWI0KGRhdGEsZS0xMik7ej0xMDEwNzU3OTI9PT1iNChkYXRhLHplKSx6JiYoYz1sZnQ9YjQoZGF0YSx6ZSszMiksbz1iNChkYXRhLHplKzQ4KSl9Y29uc3QgZmx0cj1vcHRzJiZvcHRzLmZpbHRlcixfbG9vcF8zPWZ1bmN0aW9uKCl7Y29uc3QgX2E9emgoZGF0YSxvLHopLGNfMT1fYVswXSxzYz1fYVsxXSxzdT1fYVsyXSxmbj1fYVszXSxubz1fYVs0XSxvZmY9X2FbNV0sYj1zbHpoKGRhdGEsb2ZmKTtvPW5vO2NvbnN0IGNibD1mdW5jdGlvbihlLGQpe2U/KHRBbGwoKSxjYmQoZSxudWxsKSk6KGQmJihmaWxlc1tmbl09ZCksLS1sZnR8fGNiZChudWxsLGZpbGVzKSl9O2lmKCFmbHRyfHxmbHRyKHtuYW1lOmZuLHNpemU6c2Msb3JpZ2luYWxTaXplOnN1LGNvbXByZXNzaW9uOmNfMX0pKWlmKGNfMSlpZig4PT09Y18xKXtjb25zdCBpbmZsPWRhdGEuc3ViYXJyYXkoYixiK3NjKTtpZihzYzwzMmU0KXRyeXtjYmwobnVsbCxpbmZsYXRlU3luYyhpbmZsLG5ldyB1OChzdSkpKX1jYXRjaChlKXtjYmwoZSxudWxsKX1lbHNlIHRlcm0ucHVzaChpbmZsYXRlKGluZmwse3NpemU6c3V9LGNibCkpfWVsc2UgY2JsKGVycigxNCxcInVua25vd24gY29tcHJlc3Npb24gdHlwZSBcIitjXzEsMSksbnVsbCk7ZWxzZSBjYmwobnVsbCxzbGMoZGF0YSxiLGIrc2MpKTtlbHNlIGNibChudWxsLG51bGwpfTtmb3IobGV0IGk9MDtpPGM7KytpKV9sb29wXzMoaSl9ZWxzZSBjYmQobnVsbCx7fSk7cmV0dXJuIHRBbGx9XG4iXSwibmFtZXMiOlsic3RyRnJvbVU4IiwidW56aXAiLCJjaDIiLCJ3ayIsImMiLCJpZCIsIm1zZyIsInRyYW5zZmVyIiwiY2IiLCJ3IiwiV29ya2VyIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsInR5cGUiLCJvbm1lc3NhZ2UiLCJlIiwiZCIsImRhdGEiLCJlZCIsIiRlJCIsImVyciIsIkVycm9yIiwiY29kZSIsInN0YWNrIiwicG9zdE1lc3NhZ2UiLCJ1OCIsIlVpbnQ4QXJyYXkiLCJ1MTYiLCJVaW50MTZBcnJheSIsInUzMiIsIlVpbnQzMkFycmF5IiwiZmxlYiIsImZkZWIiLCJjbGltIiwiZnJlYiIsImViIiwic3RhcnQiLCJiIiwiaSIsInIiLCJqIiwiX2EiLCJmbCIsInJldmZsIiwiX2IiLCJmZCIsInJldiIsIngiLCJoTWFwIiwiY2QiLCJtYiIsInMiLCJsZW5ndGgiLCJsIiwibGUiLCJjbyIsInJ2YiIsInN2Iiwicl8xIiwidiIsIm0iLCJmbHQiLCJmZHQiLCJmbHJtIiwiZmRybSIsIm1heCIsImEiLCJiaXRzIiwicCIsIm8iLCJiaXRzMTYiLCJzaGZ0Iiwic2xjIiwibiIsIkJZVEVTX1BFUl9FTEVNRU5UIiwic2V0Iiwic3ViYXJyYXkiLCJlYyIsImluZCIsIm50IiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJpbmZsdCIsImRhdCIsImJ1ZiIsInN0Iiwic2wiLCJmIiwibm9CdWYiLCJub1N0IiwiY2J1ZiIsImJsIiwibmJ1ZiIsIk1hdGgiLCJmaW5hbCIsInBvcyIsImJ0IiwibG0iLCJkbSIsImxidCIsImRidCIsInRidHMiLCJ0IiwiaExpdCIsImhjTGVuIiwidGwiLCJsZHQiLCJjbHQiLCJjbGIiLCJjbGJtc2siLCJjbG0iLCJsdCIsImR0IiwibG1zIiwiZG1zIiwibHBvcyIsInN5bSIsImFkZCIsImRzeW0iLCJlbmQiLCJtcmciLCJrIiwid2NsbiIsImZuIiwiZm5TdHIiLCJ0ZCIsInRvU3RyaW5nIiwia3MiLCJzbGljZSIsImluZGV4T2YiLCJsYXN0SW5kZXhPZiIsInJlcGxhY2UiLCJzcGxpdCIsInN0XzEiLCJwcm90b3R5cGUiLCJzcEluZCIsImNoIiwiY2JmcyIsImJ1ZmZlciIsInB1c2giLCJjb25zdHJ1Y3RvciIsIndya3IiLCJmbnMiLCJpbml0IiwidGRfMSIsImJJbmZsdCIsImluZmxhdGVTeW5jIiwicGJmIiwiZ3U4Iiwic2l6ZSIsImNiaWZ5Iiwib3B0cyIsInRlcm1pbmF0ZSIsImNvbnN1bWUiLCJiMiIsImI0IiwiaW5mbGF0ZSIsImV2Iiwib3V0IiwiVGV4dERlY29kZXIiLCJkdXRmOCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImxhdGluMSIsImFwcGx5IiwiZGVjb2RlIiwic2x6aCIsInpoIiwieiIsImZubCIsImVzIiwiYnMiLCJ6NjRlIiwic2MiLCJzdSIsIm9mZiIsIm10IiwicXVldWVNaWNyb3Rhc2siLCJzZXRUaW1lb3V0IiwidGVybSIsInRBbGwiLCJmaWxlcyIsImNiZCIsImxmdCIsInplIiwiZmx0ciIsImZpbHRlciIsIl9sb29wXzMiLCJjXzEiLCJubyIsImNibCIsIm5hbWUiLCJvcmlnaW5hbFNpemUiLCJjb21wcmVzc2lvbiIsImluZmwiXSwibWFwcGluZ3MiOiJBQUNBLGNBQWM7QUFDZCxFQUFFO0FBQ0YsbUNBQW1DO0FBQ25DLEVBQUU7QUFDRiwrRUFBK0U7QUFDL0UsZ0ZBQWdGO0FBQ2hGLCtFQUErRTtBQUMvRSw0RUFBNEU7QUFDNUUsd0VBQXdFO0FBQ3hFLDJEQUEyRDtBQUMzRCxFQUFFO0FBQ0YsaUZBQWlGO0FBQ2pGLGtEQUFrRDtBQUNsRCxFQUFFO0FBQ0YsNkVBQTZFO0FBQzdFLDJFQUEyRTtBQUMzRSw4RUFBOEU7QUFDOUUseUVBQXlFO0FBQ3pFLGdGQUFnRjtBQUNoRixnRkFBZ0Y7QUFDaEYsWUFBWTs7Ozs7Ozs7Ozs7O0lBQ21pT0EsU0FBUztlQUFUQTs7SUFBc3JCQyxLQUFLO2VBQUxBOzs7QUFBbnVQLE1BQU1DLE1BQUksQ0FBQyxHQUFFQyxLQUFHLFNBQVNDLENBQUMsRUFBQ0MsRUFBRSxFQUFDQyxHQUFHLEVBQUNDLFFBQVEsRUFBQ0MsRUFBRTtJQUFFLE1BQU1DLElBQUUsSUFBSUMsT0FBT1IsR0FBRyxDQUFDRyxHQUFHLElBQUdILENBQUFBLEdBQUcsQ0FBQ0csR0FBRyxHQUFDTSxJQUFJQyxlQUFlLENBQUMsSUFBSUMsS0FBSztRQUFDVCxJQUFFO0tBQWtHLEVBQUM7UUFBQ1UsTUFBSztJQUFpQixHQUFFO0lBQUksT0FBT0wsRUFBRU0sU0FBUyxHQUFDLFNBQVNDLENBQUM7UUFBRSxNQUFNQyxJQUFFRCxFQUFFRSxJQUFJLEVBQUNDLEtBQUdGLEVBQUVHLEdBQUc7UUFBQyxJQUFHRCxJQUFHO1lBQUMsTUFBTUUsTUFBSSxJQUFJQyxNQUFNSCxFQUFFLENBQUMsRUFBRTtZQUFFRSxJQUFJRSxJQUFJLEdBQUNKLEVBQUUsQ0FBQyxFQUFFLEVBQUNFLElBQUlHLEtBQUssR0FBQ0wsRUFBRSxDQUFDLEVBQUUsRUFBQ1gsR0FBR2EsS0FBSTtRQUFLLE9BQU1iLEdBQUcsTUFBS1M7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

}),
"7933": (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";
/* eslint-env browser */ // Borrowed from https://github.com/reslear/dotlottie-player-core/blob/ab9ab866df3f6687111f9317189b83b66c0d19f8/src/fetch.ts#L62
//
// MIT License
//
// Copyright (c) 2022 reslear
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fetchLottie: function() {
        return fetchLottie;
    },
    unZipDotLottie: function() {
        return unZipDotLottie;
    }
});
const _fflatemin = __webpack_require__(3487);
function parseManifest(data) {
    const manifest = JSON.parse(data);
    if (!('animations' in manifest)) {
        throw new Error('Manifest not found');
    }
    if (manifest.animations.length === 0) {
        throw new Error('No animations listed in the manifest');
    }
    return manifest;
}
function isBytesZip(bytes) {
    // lottie file is a zip file format https://en.wikipedia.org/wiki/List_of_file_signatures
    // @see https://stackoverflow.com/a/66046176
    const b = new Uint8Array(bytes, 0, 32);
    return b[0] === 80 && b[1] === 75 && b[2] === 3 && b[3] === 4;
}
async function fetchRequest(url) {
    return await fetch(new URL(url, window?.location?.href).href).then((r)=>r.arrayBuffer());
}
async function base64fromU8(data) {
    const base64url = await new Promise((resolve)=>{
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([
            data
        ]));
        reader.onload = ()=>resolve(reader.result);
    });
    // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type 'string'.
    return base64url.split(',', 2)[1];
}
async function unZip(buffer) {
    const file = new Uint8Array(buffer);
    const lottieFile = await new Promise((resolve, reject)=>{
        (0, _fflatemin.unzip)(file, (err, unzipped)=>err ? reject(err) : resolve(unzipped));
    });
    return {
        // @ts-expect-error - TS2322 - Type 'string | Uint8Array | Uint16Array | Uint32Array' is not assignable to type 'string'.
        read: (path)=>(0, _fflatemin.strFromU8)(lottieFile[path]),
        readB64: async (path)=>await base64fromU8(lottieFile[path])
    };
}
async function prepareLottieAssets(lottieJson, dotLottie) {
    if (!('assets' in lottieJson)) {
        return lottieJson;
    }
    async function parseAsset(asset) {
        const { p } = asset;
        if (p == null) return asset;
        if (dotLottie.read(`images/${p}`) == null) return asset;
        const ext = p.split('.').pop();
        const assetB64 = await dotLottie.readB64(`images/${p}`);
        // Handles assets that are encoded directly in the JSON
        if (ext?.startsWith('data:')) {
            asset.p = ext;
            asset.e = 1;
            return asset;
        }
        switch(ext){
            case 'svg':
            case 'svg+xml':
                asset.p = `data:image/svg+xml;base64,${assetB64}`;
                break;
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'webp':
                asset.p = `data:image/${ext};base64,${assetB64}`;
                break;
            default:
                asset.p = `data:;base64,${assetB64}`;
        }
        asset.e = 1;
        return asset;
    }
    const result = await Promise.all(lottieJson.assets.map(parseAsset));
    result.map((asset, i)=>{
        lottieJson.assets[i] = asset;
    });
    return lottieJson;
}
async function unZipDotLottie(response) {
    const dotLottie = await unZip(response);
    const manifest = parseManifest(dotLottie.read('manifest.json'));
    const animations = await Promise.all(manifest.animations.map((a)=>{
        const lottieJson = JSON.parse(dotLottie.read(`animations/${a.id}.json`));
        return prepareLottieAssets(lottieJson, dotLottie);
    }));
    // @ts-expect-error - TS2322 - Type 'LottieJson | undefined' is not assignable to type 'LottieJson'.
    return animations[0];
}
async function fetchLottie(url) {
    const response = await fetchRequest(url);
    if (isBytesZip(response)) {
        return await unZipDotLottie(response);
    }
    const lottieJson = JSON.parse(new TextDecoder().decode(response));
    return lottieJson;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vLyBCb3Jyb3dlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9yZXNsZWFyL2RvdGxvdHRpZS1wbGF5ZXItY29yZS9ibG9iL2FiOWFiODY2ZGYzZjY2ODcxMTFmOTMxNzE4OWI4M2I2NmMwZDE5Zjgvc3JjL2ZldGNoLnRzI0w2MlxuLy9cbi8vIE1JVCBMaWNlbnNlXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDIyIHJlc2xlYXJcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbi8vIFNPRlRXQVJFLlxuXG5pbXBvcnQge3VuemlwLCBzdHJGcm9tVTh9IGZyb20gJy4vZmZsYXRlLm1pbic7XG5pbXBvcnQgdHlwZSB7RG90TG90dGllTWFuaWZlc3QsIExvdHRpZUpzb25Bc3NldCwgTG90dGllSnNvbn0gZnJvbSAnLi90eXBlcyc7XG5cbmZ1bmN0aW9uIHBhcnNlTWFuaWZlc3QoZGF0YTogc3RyaW5nKTogRG90TG90dGllTWFuaWZlc3Qge1xuICBjb25zdCBtYW5pZmVzdDogRG90TG90dGllTWFuaWZlc3QgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBpZiAoISgnYW5pbWF0aW9ucycgaW4gbWFuaWZlc3QpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNYW5pZmVzdCBub3QgZm91bmQnKTtcbiAgfVxuICBpZiAobWFuaWZlc3QuYW5pbWF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFuaW1hdGlvbnMgbGlzdGVkIGluIHRoZSBtYW5pZmVzdCcpO1xuICB9XG4gIHJldHVybiBtYW5pZmVzdDtcbn1cblxuZnVuY3Rpb24gaXNCeXRlc1ppcChieXRlczogQXJyYXlCdWZmZXIpOiBib29sZWFuIHtcbiAgLy8gbG90dGllIGZpbGUgaXMgYSB6aXAgZmlsZSBmb3JtYXQgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9maWxlX3NpZ25hdHVyZXNcbiAgLy8gQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjYwNDYxNzZcbiAgY29uc3QgYiA9IG5ldyBVaW50OEFycmF5KGJ5dGVzLCAwLCAzMik7XG4gIHJldHVybiBiWzBdID09PSA4MCAmJiBiWzFdID09PSA3NSAmJiBiWzJdID09PSAzICYmIGJbM10gPT09IDQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoUmVxdWVzdCh1cmw6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgcmV0dXJuIGF3YWl0IGZldGNoKG5ldyBVUkwodXJsLCB3aW5kb3c/LmxvY2F0aW9uPy5ocmVmKS5ocmVmKS50aGVuKChyKSA9PlxuICAgIHIuYXJyYXlCdWZmZXIoKVxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBiYXNlNjRmcm9tVTgoZGF0YTogVWludDhBcnJheSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGJhc2U2NHVybCA9IGF3YWl0IG5ldyBQcm9taXNlKFxuICAgIChcbiAgICAgIHJlc29sdmU6IChcbiAgICAgICAgcmVzdWx0OlxuICAgICAgICAgIHwgUHJvbWlzZTxudWxsIHwgQXJyYXlCdWZmZXIgfCBzdHJpbmc+XG4gICAgICAgICAgfCBudWxsXG4gICAgICAgICAgfCBBcnJheUJ1ZmZlclxuICAgICAgICAgIHwgc3RyaW5nXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChuZXcgQmxvYihbZGF0YV0pKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgIH1cbiAgKTtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzIyIC0gVHlwZSAnc3RyaW5nIHwgdW5kZWZpbmVkJyBpcyBub3QgYXNzaWduYWJsZSB0byB0eXBlICdzdHJpbmcnLlxuICByZXR1cm4gKGJhc2U2NHVybCBhcyBzdHJpbmcpLnNwbGl0KCcsJywgMilbMV07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVuWmlwKGJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBQcm9taXNlPHtcbiAgcmVhZDogKGFyZzE6IHN0cmluZykgPT4gc3RyaW5nO1xuICByZWFkQjY0OiAoYXJnMTogc3RyaW5nKSA9PiBQcm9taXNlPHN0cmluZz47XG59PiB7XG4gIGNvbnN0IGZpbGUgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICBjb25zdCBsb3R0aWVGaWxlID0gYXdhaXQgbmV3IFByb21pc2UoXG4gICAgKFxuICAgICAgcmVzb2x2ZTogKHJlc3VsdDogUHJvbWlzZTxuZXZlcj4pID0+IHZvaWQsXG4gICAgICByZWplY3Q6IChlcnJvcj86IEVycm9yKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICB1bnppcChmaWxlLCAoZXJyOiBFcnJvciwgdW56aXBwZWQ6IGFueSkgPT5cbiAgICAgICAgZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKHVuemlwcGVkKVxuICAgICAgKTtcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVFMyMzIyIC0gVHlwZSAnc3RyaW5nIHwgVWludDhBcnJheSB8IFVpbnQxNkFycmF5IHwgVWludDMyQXJyYXknIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ3N0cmluZycuXG4gICAgcmVhZDogKHBhdGgpID0+IHN0ckZyb21VOChsb3R0aWVGaWxlW3BhdGhdKSxcbiAgICByZWFkQjY0OiBhc3luYyAocGF0aCkgPT4gYXdhaXQgYmFzZTY0ZnJvbVU4KGxvdHRpZUZpbGVbcGF0aF0pLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcmVwYXJlTG90dGllQXNzZXRzKFxuICBsb3R0aWVKc29uOiBMb3R0aWVKc29uLFxuICBkb3RMb3R0aWU6IHtcbiAgICByZWFkOiAoYXJnMTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gICAgcmVhZEI2NDogKGFyZzE6IHN0cmluZykgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICB9XG4pIHtcbiAgaWYgKCEoJ2Fzc2V0cycgaW4gbG90dGllSnNvbikpIHtcbiAgICByZXR1cm4gbG90dGllSnNvbjtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHBhcnNlQXNzZXQoYXNzZXQ6IExvdHRpZUpzb25Bc3NldCkge1xuICAgIGNvbnN0IHtwfSA9IGFzc2V0O1xuXG4gICAgaWYgKHAgPT0gbnVsbCkgcmV0dXJuIGFzc2V0O1xuICAgIGlmIChkb3RMb3R0aWUucmVhZChgaW1hZ2VzLyR7cH1gKSA9PSBudWxsKSByZXR1cm4gYXNzZXQ7XG5cbiAgICBjb25zdCBleHQgPSBwLnNwbGl0KCcuJykucG9wKCk7XG4gICAgY29uc3QgYXNzZXRCNjQgPSBhd2FpdCBkb3RMb3R0aWUucmVhZEI2NChgaW1hZ2VzLyR7cH1gKTtcblxuICAgIC8vIEhhbmRsZXMgYXNzZXRzIHRoYXQgYXJlIGVuY29kZWQgZGlyZWN0bHkgaW4gdGhlIEpTT05cbiAgICBpZiAoZXh0Py5zdGFydHNXaXRoKCdkYXRhOicpKSB7XG4gICAgICBhc3NldC5wID0gZXh0O1xuICAgICAgYXNzZXQuZSA9IDE7XG4gICAgICByZXR1cm4gYXNzZXQ7XG4gICAgfVxuXG4gICAgc3dpdGNoIChleHQpIHtcbiAgICAgIGNhc2UgJ3N2Zyc6XG4gICAgICBjYXNlICdzdmcreG1sJzpcbiAgICAgICAgYXNzZXQucCA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCR7YXNzZXRCNjR9YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwbmcnOlxuICAgICAgY2FzZSAnanBnJzpcbiAgICAgIGNhc2UgJ2pwZWcnOlxuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgIGNhc2UgJ3dlYnAnOlxuICAgICAgICBhc3NldC5wID0gYGRhdGE6aW1hZ2UvJHtleHR9O2Jhc2U2NCwke2Fzc2V0QjY0fWA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXNzZXQucCA9IGBkYXRhOjtiYXNlNjQsJHthc3NldEI2NH1gO1xuICAgIH1cblxuICAgIGFzc2V0LmUgPSAxO1xuXG4gICAgcmV0dXJuIGFzc2V0O1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwobG90dGllSnNvbi5hc3NldHMubWFwKHBhcnNlQXNzZXQpKTtcblxuICByZXN1bHQubWFwKChhc3NldCwgaSkgPT4ge1xuICAgIGxvdHRpZUpzb24uYXNzZXRzW2ldID0gYXNzZXQ7XG4gIH0pO1xuXG4gIHJldHVybiBsb3R0aWVKc29uO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgYC5sb3R0aWVgIGZpbGUgYXMgYW4gYXJyYXkgYnVmZmVyLCBgdW5aaXBEb3RMb3R0aWVgIHVuemlwcyB0aGUgZmlsZSxcbiAqIHBhcnNlcyB0aGUgYXNzZXRzLCBhbmQgdGhlbiByZXR1cm5zIHRoZSBwYXJzZWQgbG90dGllIEpTT04gZmlsZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVuWmlwRG90TG90dGllKFxuICByZXNwb25zZTogQXJyYXlCdWZmZXJcbik6IFByb21pc2U8TG90dGllSnNvbj4ge1xuICBjb25zdCBkb3RMb3R0aWUgPSBhd2FpdCB1blppcChyZXNwb25zZSk7XG4gIGNvbnN0IG1hbmlmZXN0ID0gcGFyc2VNYW5pZmVzdChkb3RMb3R0aWUucmVhZCgnbWFuaWZlc3QuanNvbicpKTtcbiAgY29uc3QgYW5pbWF0aW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIG1hbmlmZXN0LmFuaW1hdGlvbnMubWFwKChhKSA9PiB7XG4gICAgICBjb25zdCBsb3R0aWVKc29uID0gSlNPTi5wYXJzZShkb3RMb3R0aWUucmVhZChgYW5pbWF0aW9ucy8ke2EuaWR9Lmpzb25gKSk7XG4gICAgICByZXR1cm4gcHJlcGFyZUxvdHRpZUFzc2V0cyhsb3R0aWVKc29uLCBkb3RMb3R0aWUpO1xuICAgIH0pXG4gICk7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRTMjMyMiAtIFR5cGUgJ0xvdHRpZUpzb24gfCB1bmRlZmluZWQnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ0xvdHRpZUpzb24nLlxuICByZXR1cm4gYW5pbWF0aW9uc1swXTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIFVSTCBwYXRoLCBgZmV0Y2hMb3R0aWVgIGZldGNoZXMgYSBgLmxvdHRpZWAgZmlsZSwgdW56aXBzIHRoZSBmaWxlLCBwYXJzZXMgdGhlIGFzc2V0cyxcbiAqIGFuZCB0aGVuIHJldHVybnMgdGhlIHBhcnNlZCBsb3R0aWUgSlNPTi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTG90dGllKHVybDogc3RyaW5nKTogUHJvbWlzZTxMb3R0aWVKc29uPiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hSZXF1ZXN0KHVybCk7XG5cbiAgaWYgKGlzQnl0ZXNaaXAocmVzcG9uc2UpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHVuWmlwRG90TG90dGllKHJlc3BvbnNlKTtcbiAgfVxuXG4gIGNvbnN0IGxvdHRpZUpzb24gPSBKU09OLnBhcnNlKFxuICAgIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShyZXNwb25zZSlcbiAgKSBhcyBMb3R0aWVKc29uO1xuICByZXR1cm4gbG90dGllSnNvbjtcbn1cbiJdLCJuYW1lcyI6WyJmZXRjaExvdHRpZSIsInVuWmlwRG90TG90dGllIiwicGFyc2VNYW5pZmVzdCIsImRhdGEiLCJtYW5pZmVzdCIsIkpTT04iLCJwYXJzZSIsIkVycm9yIiwiYW5pbWF0aW9ucyIsImxlbmd0aCIsImlzQnl0ZXNaaXAiLCJieXRlcyIsImIiLCJVaW50OEFycmF5IiwiZmV0Y2hSZXF1ZXN0IiwidXJsIiwiZmV0Y2giLCJVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0aGVuIiwiciIsImFycmF5QnVmZmVyIiwiYmFzZTY0ZnJvbVU4IiwiYmFzZTY0dXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwicmVhZEFzRGF0YVVSTCIsIkJsb2IiLCJvbmxvYWQiLCJyZXN1bHQiLCJzcGxpdCIsInVuWmlwIiwiYnVmZmVyIiwiZmlsZSIsImxvdHRpZUZpbGUiLCJyZWplY3QiLCJ1bnppcCIsImVyciIsInVuemlwcGVkIiwicmVhZCIsInBhdGgiLCJzdHJGcm9tVTgiLCJyZWFkQjY0IiwicHJlcGFyZUxvdHRpZUFzc2V0cyIsImxvdHRpZUpzb24iLCJkb3RMb3R0aWUiLCJwYXJzZUFzc2V0IiwiYXNzZXQiLCJwIiwiZXh0IiwicG9wIiwiYXNzZXRCNjQiLCJzdGFydHNXaXRoIiwiZSIsImFsbCIsImFzc2V0cyIsIm1hcCIsImkiLCJyZXNwb25zZSIsImEiLCJpZCIsIlRleHREZWNvZGVyIiwiZGVjb2RlIl0sIm1hcHBpbmdzIjoiQUFBQSxzQkFBc0IsR0FFdEIsZ0lBQWdJO0FBQ2hJLEVBQUU7QUFDRixjQUFjO0FBQ2QsRUFBRTtBQUNGLDZCQUE2QjtBQUM3QixFQUFFO0FBQ0YsK0VBQStFO0FBQy9FLGdGQUFnRjtBQUNoRiwrRUFBK0U7QUFDL0UsNEVBQTRFO0FBQzVFLHdFQUF3RTtBQUN4RSwyREFBMkQ7QUFDM0QsRUFBRTtBQUNGLGlGQUFpRjtBQUNqRixrREFBa0Q7QUFDbEQsRUFBRTtBQUNGLDZFQUE2RTtBQUM3RSwyRUFBMkU7QUFDM0UsOEVBQThFO0FBQzlFLHlFQUF5RTtBQUN6RSxnRkFBZ0Y7QUFDaEYsZ0ZBQWdGO0FBQ2hGLFlBQVk7Ozs7Ozs7Ozs7OztJQTBKVUEsV0FBVztlQUFYQTs7SUFwQkFDLGNBQWM7ZUFBZEE7OzsyQkFwSVM7QUFHL0IsU0FBU0MsY0FBY0MsSUFBWTtJQUNqQyxNQUFNQyxXQUE4QkMsS0FBS0MsS0FBSyxDQUFD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

}),
"5513": (function (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
__webpack_require__(9461);__webpack_require__(7624);__webpack_require__(286);__webpack_require__(8334);__webpack_require__(2338);__webpack_require__(3695);__webpack_require__(322);__webpack_require__(1655);__webpack_require__(7527);__webpack_require__(941);__webpack_require__(5134);__webpack_require__(2444);__webpack_require__(9766);__webpack_require__(9078);__webpack_require__(7105);

}),
"9303": (function (module) {
"use strict";
module.exports = import("https://cdn.jsdelivr.net/npm/@splinetool/runtime/build/runtime.js");

}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
id: moduleId,
loaded: false,
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Flag the module as loaded
module.loaded = true;
// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/esm_module_decorator
(() => {
__webpack_require__.hmd = function (module) {
    module = Object.create(module);
    if (!module.children) module.children = [];
    Object.defineProperty(module, 'exports', {
        enumerable: true,
        set: function () {
            throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
        }
    });
    return module;
};
})();
// webpack/runtime/global
(() => {
__webpack_require__.g = (function () {
	if (typeof globalThis === 'object') return globalThis;
	try {
		return this || new Function('return this')();
	} catch (e) {
		if (typeof window === 'object') return window;
	}
})();

})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

})();
// webpack/runtime/node_module_decorator
(() => {
__webpack_require__.nmd = function (module) {
    module.paths = [];
    if (!module.children) module.children = [];
    return module;
};
})();
// webpack/runtime/on_chunk_loaded
(() => {
var deferred = [];
__webpack_require__.O = function (result, chunkIds, fn, priority) {
	if (chunkIds) {
		priority = priority || 0;
		for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--)
			deferred[i] = deferred[i - 1];
		deferred[i] = [chunkIds, fn, priority];
		return;
	}
	var notFulfilled = Infinity;
	for (var i = 0; i < deferred.length; i++) {
		var chunkIds = deferred[i][0],
			fn = deferred[i][1],
			priority = deferred[i][2];
		var fulfilled = true;
		for (var j = 0; j < chunkIds.length; j++) {
			if (
				(priority & (1 === 0) || notFulfilled >= priority) &&
				Object.keys(__webpack_require__.O).every(function (key) {
					return __webpack_require__.O[key](chunkIds[j]);
				})
			) {
				chunkIds.splice(j--, 1);
			} else {
				fulfilled = false;
				if (priority < notFulfilled) notFulfilled = priority;
			}
		}
		if (fulfilled) {
			deferred.splice(i--, 1);
			var r = fn();
			if (r !== undefined) result = r;
		}
	}
	return result;
};

})();
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = function () {
	return "1.1.8";
};

})();
// webpack/runtime/jsonp_chunk_loading
(() => {

      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = {"377": 0,};
      __webpack_require__.O.j = function (chunkId) {
	return installedChunks[chunkId] === 0;
};
// install a JSONP callback for chunk loading
var webpackJsonpCallback = function (parentChunkLoadingFunction, data) {
	var chunkIds = data[0];
	var moreModules = data[1];
	var runtime = data[2];
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId,
		chunkId,
		i = 0;
	if (chunkIds.some(function (id) { return installedChunks[id] !== 0 })) {
		for (moduleId in moreModules) {
			if (__webpack_require__.o(moreModules, moduleId)) {
				__webpack_require__.m[moduleId] = moreModules[moduleId];
			}
		}
		if (runtime) var result = runtime(__webpack_require__);
	}
	if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
	for (; i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId]
		) {
			installedChunks[chunkId][0]();
		}
		installedChunks[chunkId] = 0;
	}
	return __webpack_require__.O(result);
};

var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(
	null,
	chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
);

})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.1.8";

})();
/************************************************************************/
// startup
// Load entry module and return exports
// This entry module depends on other loaded chunks and execution need to be delayed
var __webpack_exports__ = __webpack_require__.O(undefined, ["87", "397", "131", "581"], function() { return __webpack_require__("5513") });
__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})()
;