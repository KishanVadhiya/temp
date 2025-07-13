// Importing required managers and types
import { ScrollManager } from "./ScrollManager.js";
import { RowsManager } from "./RowsManager.js";
import { ColumnsManager } from "./ColumnsManager.js";
import { TilesManager } from "./TilesManager.js";
import { CellsManager } from "./CellsManager.js";
import { UndoRedoManager } from "./UndoRedoManager/UndoRedoManager.js";
import { JSONUpload } from "./JSONUpload.js";
import { CalculationEngine } from "./CalculationEngine.js";
import { InteractionManager } from "./DOMEventHandler/InteractionManager.js";
/**
 * Main application class for initializing and managing the spreadsheet-like interface
 */
class App {
    /**
     * Initializes the App
     */
    constructor() {
        this.cellData = new Map();
        this.columnData = new Map();
        this.rowData = new Map();
        // Get reference to the outer input bar element
        // this.outerInput=document.querySelector(".outerInputBar") as HTMLInputElement;
        // Initialize selection coordinates with default values
        this.selectionCoordinates = {
            selectionStartRow: 1,
            selectionEndRow: 1,
            selectionStartColumn: 1,
            selectionEndColumn: 1
        };
        // Initialize CalculationEngine
        this.calculationEngineObj = new CalculationEngine(this.cellData, this.selectionCoordinates);
        this.CellsManagerObj = new CellsManager(this.cellData);
        // Initialize UndoRedoManager
        this.undoRedoManager = new UndoRedoManager();
        // Initialize ScrollManager
        this.ScrollManagerObj = new ScrollManager();
        // Initialize RowsManager
        this.RowsManagerObj = new RowsManager(this.rowData, 0, this.ScrollManagerObj.verticalNum, this.selectionCoordinates);
        // Initialize ColumnsManager
        this.ColumnsManagerObj = new ColumnsManager(this.columnData, 0, this.ScrollManagerObj.horizontalNum, this.selectionCoordinates);
        // Initialize TilesManager
        this.TilesManagerObj = new TilesManager(this.RowsManagerObj.rowsPositionPrefixSumArr, this.ColumnsManagerObj.visibleColumnsPrefixSum, this.ScrollManagerObj.verticalNum, this.ScrollManagerObj.horizontalNum, this.selectionCoordinates, this.CellsManagerObj, undefined, // Placeholder for future use
        undefined, // Placeholder for future use
        this.RowsManagerObj.marginTop, this.ColumnsManagerObj.marginLeft);
        // Initialize JSONUpload
        this.JSONUploadObj = new JSONUpload(this.cellData, this.TilesManagerObj, this.RowsManagerObj, this.ColumnsManagerObj);
        // Initialize ResizeManager
        // this.ResizeManagerObj = new ResizeManager(
        //     this.RowsManagerObj,
        //     this.TilesManagerObj,
        //     this.ColumnsManagerObj,
        //     this.ifRowResizePointerDown,
        //     this.ifColumnResizeOn,
        //     this.ifColumnResizePointerDown,
        //     this.undoRedoManager
        // );
        this.InteractionManagerObj = new InteractionManager(this.RowsManagerObj, this.ColumnsManagerObj, this.TilesManagerObj, this.selectionCoordinates, this.CellsManagerObj, this.undoRedoManager, this.calculationEngineObj);
        this.ScrollManagerObj.initializeManager(this.ColumnsManagerObj, this.RowsManagerObj, this.TilesManagerObj);
    }
}
// Instantiates the App
new App();
