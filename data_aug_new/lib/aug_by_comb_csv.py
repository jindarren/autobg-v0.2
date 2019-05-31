#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import os,sys
import os.path as osp
import itertools
import csv

'''
python lib/aug_by_comb_csv.py --in_list ./data/positive.csv --out_list ./data/data_aug_20190422.csv

'''
def parse_args():
    """Parse argument.
    Output
        args - argument
    """
    import argparse

    #argument
    parser =argparse.ArgumentParser()

    parser.add_argument('--in_list', help = 'path to input list.')
    parser.add_argument('--out_list', help = 'path for saving list.')
    args = parser.parse_args()

    return args

def load_csv(filepath):
    line_vecs=[]
    with open(filepath) as csvfile:
	reader = csv.reader(csvfile, delimiter=',')
	for row in reader:
	    line_vecs.append(row)
    return line_vecs

def save_csv(filepath, lines, subx = '\n'):
    with open(filepath, 'wb') as csvfile:
    	spamwriter = csv.writer(csvfile, dialect='excel')
	for line in lines:
	    spamwriter.writerow(line.split("\t"))

def aug(data0):
    """
    data0: original data dict, data[0~6] represents six position info
    data_aug: list of data 
    """
    data_aug = set()
    for per in itertools.permutations('012345', 6):
	new_data = []
        for i in range(len(per)):
	    j = int(per[i])
	    new_data.append(data0[j])
	data_aug.add("\t".join(new_data))
    return data_aug


def data_aug(args):
    
    origin_data = load_csv(args.in_list)
    
    #first line data
    line_elems = origin_data[0] 
    data = {}
    data_augs = {}

    # three types of elements
    for i in range(3):
        data[i] = {}
	# six positions
	for j in range(6):
	    # 12 features
	    feats = []
	    for k in range(12):
	        idx = i*6*12 + j*12 + k
		feats.append(line_elems[idx])
	    data[i][j] = "\t".join(feats)
	    print i, j, data[i][j]
	
	data_augs[i] = aug(data[i])
	print "type {} has {} diffierent variations.".format(i, len(data_augs[i]))
    
    num = len(data_augs[0]) * len(data_augs[1]) * len(data_augs[2]) 
    print "number of augmentation data: {}".format(num)
    
    # do combination and save output
    out_list = []
    for data0 in data_augs[0]:
	for data1 in data_augs[1]:
	    for data2 in data_augs[2]:
		out_list .append( "\t".join([data0, data1, data2, "\t".join(line_elems[216:260])]))

    save_csv(args.out_list, out_list)

if __name__ == '__main__':
    args = parse_args()
    data_aug(args)

