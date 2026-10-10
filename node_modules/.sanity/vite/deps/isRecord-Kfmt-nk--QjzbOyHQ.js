//#region node_modules/@sanity/client/dist/isRecord-Kfmt-nk-.js
/** @internal */
function isRecord(value) {
	return typeof value == "object" && !!value && !Array.isArray(value);
}
//#endregion
export { isRecord as t };
