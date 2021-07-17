import * as jQuery from 'jquery';
import * as _ from 'lodash';
import dagre from 'dagre';
import graphlib from 'graphlib';
import * as joint from 'jointjs';
import {Category} from '@app/_models';

export class ConceptMapGraph {
    graph;
    paper;

    constructor(onclick: (number) => unknown) {
        this.graph = new joint.dia.Graph();

        this.paper = new joint.dia.Paper({
            el: jQuery('#paper'),
            width: 2000,
            height: 1000,
            model: this.graph,
            gridSize: 20,
            interactive: false,
        });

        this.paper.on('cell:pointerdown', (cellView) => {
            if (cellView.model.attributes.type === 'standard.Ellipse') {
                onclick(cellView.model.id);
            }
        });
    }

    makeElement(id: number, label: string): joint.shapes.standard.Ellipse {
        const maxLineLength = Math.max(...label.split('\n').map(x => x.length));

        const letterSize = 16;
        const width = 1.5 * (letterSize * (0.6 * maxLineLength + 1));
        const height = 1.5 * ((label.split('\n').length + 1) * letterSize);

        return new joint.shapes.standard.Ellipse({
            id,
            size: {width, height},
            fill: '#41A4FF',
            attrs: {
                label: {
                    text: label,
                    'font-size': letterSize,
                    'font-weight': 'bold',
                    'font-family': 'sans-serif',
                    cursor: 'pointer',
                },
                body: {
                    width, height,
                    rx: 10, ry: 10,
                    stroke: '#000000',
                    cursor: 'pointer',
                    fill: '#41A4FF',
                },
            }
        });
    }

    makeLink(parentElementLabel: number, childElementLabel: number): joint.shapes.standard.Link {
        return new joint.shapes.standard.Link({
            source: {
                id: parentElementLabel,
            },
            target: {
                id: childElementLabel,
            },
            router: {
                name: 'manhattan',
                args: {
                    maxAllowedDirectionChange: 360,
                    perpendicular: false,
                    startDirections: ['right', 'top', 'bottom'],
                    endDirections: ['left', 'top', 'bottom']
                }
            },
            connector: {
                name: 'rounded',
            },
            attrs: {
                line: {
                    stroke: 'black',
                    cursor: 'default',
                    targetMarker: {
                        type: 'path',
                        d: 'M 10 -5 0 0 10 5',
                        fill: 'rgba(0,0,0,0)',
                        'stroke-width': 1.75
                    }
                },
                wrapper: {
                    cursor: 'default'
                }
            },
        });
    }

    makeCellsFromAdjacencyList(adjacencyList: Category[]): joint.shapes.standard.Ellipse[] {

        const elements = [];
        const links = [];

        _.each(adjacencyList, (category) => {
            const label = category.name.replaceAll(' ', '\n') + '\n\nAverage Success:\n' + Math.round(category.average_success) + '%';
            elements.push(this.makeElement(category.pk, label));

            _.each(category.next_category_ids, (childElementId) => {
                links.push(this.makeLink(category.pk, childElementId));
            });
        });

        return elements.concat(links);
    }

    buildGraphFromAdjacencyList(adj: Category[]): void {
        const cells = this.makeCellsFromAdjacencyList(adj);
        this.graph.resetCells(cells);
        joint.layout.DirectedGraph.layout(this.graph, {
            dagre,
            graphlib,
            nodeSep: 40,
            edgeSep: 40,
            ranker: 'longest-path',
            rankDir: 'LR',
        });
    }
}
