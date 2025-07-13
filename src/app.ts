// Importing required managers and types
import { ScrollManager } from "./ScrollManager.js";
import { RowsManager } from "./RowsManager.js";
import { ColumnsManager } from "./ColumnsManager.js";
import { TilesManager } from "./TilesManager.js";

import { MultipleSelectionCoordinates } from "./types/MultipleSelectionCoordinates.js";
import { CellsManager } from "./CellsManager.js";
import { UndoRedoManager } from "./UndoRedoManager/UndoRedoManager.js";
import { JSONUpload } from "./JSONUpload.js";
import { CellsMap } from "./types/CellsMap.js";
import { ColumnData } from "./types/ColumnRows.js";
import { RowData } from "./types/RowsColumn.js";
import { CalculationEngine } from "./CalculationEngine.js";
import { InteractionManager } from "./DOMEventHandler/InteractionManager.js";

/**
 * Main application class for initializing and managing the spreadsheet-like interface
 */
class App {

    /**@type {MultipleSelectionCoordinates} Stores the selection start and end coordinates */
    private selectionCoordinates: MultipleSelectionCoordinates;

    /** @type {HTMLInputElement} Reference to the outer input bar HTML element. */
    // private outerInput:HTMLInputElement;

    /** @type {CellsMap} A map holding all the cell data. */
    private cellData:CellsMap;

    /** @type {ColumnData} A map holding column-specific data. */
    private columnData:ColumnData;

    /** @type {RowData} A map holding row-specific data. */
    private rowData:RowData;

    /** @type {CellsManager} Instance of the CellsManager to handle cell data. */
    private CellsManagerObj:CellsManager;

    /** @type {UndoRedoManager} Instance of the UndoRedoManager for managing undo/redo operations. */
    private undoRedoManager:UndoRedoManager;

    /** @type {ScrollManager} Instance of the ScrollManager to handle scrolling. */
    private ScrollManagerObj:ScrollManager;

    /** @type {RowsManager} Instance of the RowsManager to handle row-related operations. */
    private RowsManagerObj:RowsManager;

    /** @type {ColumnsManager} Instance of the ColumnsManager to handle column-related operations. */
    private ColumnsManagerObj:ColumnsManager;

    /** @type {TilesManager} Instance of the TilesManager to handle cell rendering and interaction. */
    private TilesManagerObj:TilesManager;

    /** @type {JSONUpload} Instance of the JSONUpload to handle JSON file operations. */
    private JSONUploadObj:JSONUpload;

    /** @type {ResizeManager} Instance of the ResizeManager to handle row and column resizing. */
    // private ResizeManagerObj:ResizeManager;

    /** @type {CellSelectionManager} Instance of the CellSelectionManager to handle cell selections. */
    // private CellSelectionManagerObj:SelectionManager;

    /** @type {CalculationEngine} Instance of the CalculationEngine to perform calculations on selected cells. */
    private calculationEngineObj:CalculationEngine;


    private InteractionManagerObj:InteractionManager;



    /**
     * Initializes the App
     */
    constructor() {
        this.cellData=new Map();
        this.columnData=new Map();
        this.rowData= new Map();
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
        this.calculationEngineObj=new CalculationEngine(this.cellData,this.selectionCoordinates);

        this.CellsManagerObj = new CellsManager(this.cellData);

        
        // Initialize UndoRedoManager
        this.undoRedoManager= new UndoRedoManager();
        
        // Initialize ScrollManager
        this.ScrollManagerObj = new ScrollManager();
        
        // Initialize RowsManager
        this.RowsManagerObj = new RowsManager(
            this.rowData,
            0,
            this.ScrollManagerObj.verticalNum,
            this.selectionCoordinates,
        );
        
        // Initialize ColumnsManager
        this.ColumnsManagerObj = new ColumnsManager(
            this.columnData,
            0,
            this.ScrollManagerObj.horizontalNum,
            this.selectionCoordinates
        );
        
        // Initialize TilesManager
        this.TilesManagerObj = new TilesManager(
            this.RowsManagerObj.rowsPositionPrefixSumArr,
            this.ColumnsManagerObj.visibleColumnsPrefixSum,
            this.ScrollManagerObj.verticalNum,
            this.ScrollManagerObj.horizontalNum,
            this.selectionCoordinates,
            this.CellsManagerObj,
            undefined, // Placeholder for future use
            undefined, // Placeholder for future use
            this.RowsManagerObj.marginTop,
            this.ColumnsManagerObj.marginLeft
        );
        // Initialize JSONUpload
        this.JSONUploadObj= new JSONUpload(this.cellData,this.TilesManagerObj,this.RowsManagerObj,this.ColumnsManagerObj);

        
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

        this.InteractionManagerObj=new InteractionManager(
            this.RowsManagerObj,
            this.ColumnsManagerObj,
            this.TilesManagerObj,
            this.selectionCoordinates,
            this.CellsManagerObj,
            this.undoRedoManager,
            this.calculationEngineObj
        );

        this.ScrollManagerObj.initializeManager(this.ColumnsManagerObj, this.RowsManagerObj, this.TilesManagerObj);

    }

}

// Instantiates the App
new App();